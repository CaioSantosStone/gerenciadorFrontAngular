import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { HttpClientService } from './http-client.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(
    private httpClientService: HttpClientService) { }

  getUsers() {
    return this.httpClientService.get(`${environment.API_URL}/users`);
  }

  getChat(toId, fromId) {
    return this.httpClientService.get(`${environment.API_URL}/chat?fromId=${fromId}&toId=${toId}`);
  }

  sendMessage(chatId, message) {    
    let data = {chatId: chatId, message: message};
    return this.httpClientService.post(`${environment.API_URL}/messages`, data);
  }

  createChat(toId, fromId) {
    let data = {fromId: fromId, toId: toId};
    return this.httpClientService.post(`${environment.API_URL}/chat`, data);
  }

  getMessagesByChat(chatId) {
    return this.httpClientService.get(`${environment.API_URL}/messages/${chatId}`);
  }

}