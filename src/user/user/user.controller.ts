import { Body, Controller, Delete, Get, Header, HttpCode, HttpRedirectResponse, Inject, Ip, Optional, Param, Patch, Post, Put, Query, Redirect, Req, Res } from '@nestjs/common';
import { Request, Response, response } from 'express';
import { UserService } from './user.service';
import { Connection } from '../connection/connection';
import { MailService, mailService } from '../mail/mail.service';
import { UserRepository } from '../user-repository/user-repository';

class PostDTO {
    name: string;
    address: string;
    message: string;
}
// https://www.youtube.com/watch?v=xzu3QXwo1BU

@Controller("/user")
export class UserController {
    // bisa menggunakan property inject
    @Inject()
    @Optional()
    private userService: UserService;
    // bisa menggunakan constructor juga
    constructor(
        private service: UserService,
        private connection: Connection,
        private mailService: MailService,
        private userRepository: UserRepository
    ) { }

    @Get('/connection')
    async sayConnection(): Promise<string> {
        this.mailService.send();
        this.userRepository.save();
        return this.connection.getName();
    }


    /* asynchronous method
    url: /user/say-hello
    */
    @Get('/say-hello')
    async asyncSayHelloBro(@Query('name') name: string): Promise<string> {
        return this.service.sayHello(name);
    }


    /* Use Views HTML
    url : /user/view/hello?name=agussutarom
    */
    @Get('/view/hello')
    viewHello(@Query('name') name: string, @Res() response: Response) {
        response.render('index.html', {
            title: 'Nest with HTML Render View',
            name: name
        });
    }

    // COOKIE

    /* get cookie
    url: /user/get-cookie
    */
    @Get('/get-cookie')
    getCookie(@Req() request: Request): string {
        return request.cookies['name'];
    }

    /* set cookie
    url: /user/set-cookie
    */
    @Get('/set-cookie')
    setCookie(@Query('name') name: string, @Res() response: Response) {
        response.cookie('name', name);
        response.status(200).send('cookies was set');
    }


    /* asynchronous method
    url: /user/async-simple-res
    */
    @Get('/async-simple-res')
    async asyncSayHello(): Promise<string> {
        return 'Hallo Kawan saya menggunakan async';
    }

    /* redirecting
    url: /user/redirect
    */
    @Get('/redirect')
    @Redirect()
    redirecting(): HttpRedirectResponse {
        return {
            url: "/user/simple-res-recom",
            statusCode: 301
        };
    }

    /* recommended response for nest
    url: /user/simple-res-recom
    */
    @Get('/simple-res-recom')
    @Header("Content-Type", "application/json")
    @HttpCode(200)
    simpleResponseRecommend(): Record<string, string> {
        return {
            data: 'Hello Json with Recommended Decorator'
        }
    }

    /* not recommend response for nest, it use express Response
    url: /user/async-simple-res
    */
    // NOT RECOMMENDED
    @Get('/simple-res')
    simpleResponse(@Res() response: Response) {
        response.status(200).send('Simple Response')
    }

    @Get()
    get(): string {
        return 'GET Method';
    }

    @Get('/with-ip')
    getIp(@Ip() ipAddress: string): string {
        return `GET Method with your ip ${ipAddress}`;
    }

    // Ex : /user/get-recommended-multi-query?id=2&address=Jombang
    @Get('/get-recommended-multi-query')
    getWithQueryMulti(
        @Query('id') id: string,
        @Query('address') address: string
    ): string {
        return `Recommended Nest with ID getter Multi Query ID ${id} with Address: ${address}`;
    }

    // Ex : /user/get-recommended-query?id=2
    @Get('/get-recommended-query')
    getWithQuery(
        @Query('id') id: string
    ): string {
        return `Recommended Nest with ID getter Query ID ${id}`;
    }

    // Ex : /user/get-recommended/2/Agus-Sutarom
    @Get('/get-recommended/:id/:name')
    getWithIdRecommendedMultiParam(
        @Param('id') id: string,
        @Param('name') name: string
    ): string {
        return `Recommended Nest with ID getter Param Multiple ID ${id} And Name ${name}`;
    }

    // /user/get-recommended/2
    @Get('/get-recommended/:id')
    getWithIdRecommended(@Param('id') id: string): string {
        return `Recommended Nest with ID getter Param ${id}`;
    }

    // tidak disarankan
    @Get('/:id')
    getWithId(@Req() request: Request): string {
        return `This will be your ID: ${request.params.id}`;
    }

    @Put('/:id')
    put(): string {
        return 'PUT METHOD';
    }

    @Patch('/:id')
    patch(): string {
        return 'PATCH METHOD';
    }

    @Delete('/:id')
    deleteItem(): string {
        return 'DELETE ITEM';
    }

    @Post()
    post(): string {
        return 'POST';
    }

    @Post('/with-body')
    postBody(@Body() body: PostDTO): string {
        return 'POST with body' + JSON.stringify(body);
    }
}
