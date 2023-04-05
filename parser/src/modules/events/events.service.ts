import { MessageBody, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { ConnectedSocket, WebSocketServer } from '@nestjs/websockets/decorators';
import { concatMap, of, repeat } from 'rxjs';
import { GeneratorDataService } from '../generator-data/generator-data.service';
import { Server, Socket } from "socket.io"
import { SearchService } from '../search/search.service';

@WebSocketGateway({
    cors: {
        origin: '*',
    },
})
export class EventsService {
    iterator = 0;
    client = []
    articles = []

    constructor(
        private readonly generatorDataInDb: GeneratorDataService,
        private readonly searchService: SearchService,
    ) { }

    @WebSocketServer()
    server: Server

    @SubscribeMessage('message')
    async getKeysInstance(@ConnectedSocket() client: Socket, @MessageBody() article) {
        const event = 'message';
        const find = await this.generatorDataInDb.findOne({ article: article.message.article });

        this.articles.push({ clientId: client.id, articleId: article.message.article });

        const observable$ = of(find.data_generation)

        console.log(this.articles)

        observable$
            .pipe(concatMap((data => {
                console.log(data[this.iterator].keys)
                const result = this.searchService.search(data[this.iterator].keys, article.message.article)
                this.iterator++;
                return result
            })))
            .pipe(concatMap((data) => {
                return of(data);
            }))
            .pipe(this.iterator !== find.instance ? repeat(find.instance) : null)
            .subscribe((data: []) => data?.length === 0 ? null : client.emit(event, data))


        this.iterator === find.instance ? observable$.subscribe().closed : null;



    }

    afterInit(server: Server) {
        this.server.emit('connection');
    }

    async handleDisconnect(client: Socket) {
        console.log(`Disconnected: ${client.id}`);
        console.log(this.articles)
        const id = this.articles.find((c) => c.clientId === client.id);
        console.log(id, "ID");
        await this.generatorDataInDb.delete({ article: id.articleId });

        this.articles = this.articles.filter(c => c.id === client.id);
        console.log(this.articles)
    }

    async handleConnection(client: Socket, ...args: any[]) {
        client.request.socket.setKeepAlive(true)

    }


}


