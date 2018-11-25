import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../../services/chat.service';
import { AuthenticationService } from '../../../services/authentication.service';
@Component({
    selector: 'ngx-messages',
    templateUrl: './messages.component.html',
    styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

    filterUser: any = '';
    users: any = [];
    chatActive: string = "";
    isChatActive: boolean = false;
    activeId: string = "";
    chatToId: string;
    chatFromId: string;
    message: string;
    toMessages: Array<number>;
    fromMessages: Array<number>;
    sended: Array<Text>;
    recieved: Array<Text>;
    messages: any = [];

    constructor(
        private chatService: ChatService,
        private authenticationService: AuthenticationService
    ) { }

    async ngOnInit() {
        await this.getUsers();
        let firstUser = this.users[0]['_id'];
        console.log(firstUser);
        await this.showMessages(firstUser);

    }

    async getUsers() {
        try {
            this.users = (await this.chatService.getUsers())['users'];
        } catch (err) {

        }
    }

    async showMessages(toId) {
        await this.activeChat(toId);
        await this.getToChat();
        await this.getFromChat();
        this.getMessages();
    }

    async activeChat(toId) {
        this.chatActive = await "active_chat";
        this.isChatActive = await true;
        this.activeId = await toId;
    }

    async getFromChat() {
        let fromId = (await this.authenticationService.getLogged())['_id'];
        try {
            this.chatFromId = (await ((await this.chatService.getChat(fromId, this.activeId))['contents']).pop())['_id'];
        } catch (err) {
            await this.chatService.createChat(fromId, this.activeId);
            let chat = await this.chatService.getChat(this.activeId, fromId);
            let contents = await chat['contents'];
        }

    }

    async getToChat() {
        try {
            let fromId = (await this.authenticationService.getLogged())['_id'];
            this.chatToId = (await ((await this.chatService.getChat(this.activeId, fromId))['contents']).pop())['_id'];
        } catch (err) {
            console.log(err);
        }
        return this.chatToId;
    }

    async sendMessage() {
        if (!this.message) { return; }
        try {
            let fromId = (await this.authenticationService.getLogged())['_id'];
            let chat = await this.chatService.getChat(this.activeId, fromId);
            let contents = chat['contents'];
            if (contents.length == 0) {
                await this.chatService.createChat(this.activeId, fromId);
                let chat = await this.chatService.getChat(this.activeId, fromId);
                let contents = await chat['contents'];
            }
            contents.forEach(chatContent => {
                var id = chatContent['_id'];
                this.chatService.sendMessage(id, this.message);
            });
            this.messages.push({ message: this.message, outgoing_msg: true, createdAt: new Date() });
            this.message = '';
            this.scrollToLastMessage();
        } catch (err) {

        }
    }

    async getMessages() {
        this.toMessages = (await this.chatService.getMessagesByChat(this.chatToId))['contents'];
        this.fromMessages = (await this.chatService.getMessagesByChat(this.chatFromId))['contents'];

        this.toMessages = this.toMessages.map((currentMessage: any) => {
            currentMessage.outgoing_msg = true;
            currentMessage.createdAt = new Date(currentMessage.createdAt);
            return currentMessage;
        });
        this.fromMessages = this.fromMessages.map((currentMessage: any) => {
            currentMessage.incoming_msg = true;
            currentMessage.createdAt = new Date(currentMessage.createdAt);
            return currentMessage;
        });
        this.messages = [...this.fromMessages, ...this.toMessages].sort((a: any, b: any) => a.createdAt - b.createdAt);
        this.scrollToLastMessage();
    }

    scrollToLastMessage() {
        setTimeout(() => document.getElementById(`${this.messages.length - 1}-message`)
            .scrollIntoView({ behavior: 'smooth', block: 'center' }), 500);
    }

}
