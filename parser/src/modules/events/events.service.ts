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

        const observable$ = of(find.data_generation)

        observable$
            .pipe(concatMap((data => {
                const result = this.searchService.search(data[this.iterator], article.message.article)
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

    handleDisconnect(client: Socket) {
        console.log(`Disconnected: ${client.id}`);
    }

    handleConnection(client: Socket, ...args: any[]) {
        client.request.socket.setKeepAlive(true)

    }


}


