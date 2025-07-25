import { Component, inject, OnInit, signal } from '@angular/core';
import { MessagesService } from '../../../SERVICES/MESSAGES/messages.service';
import { Message } from '../../../UTILS/types';

@Component({
  selector: 'app-messages',
  imports: [],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css',
})
export class MessagesComponent implements OnInit {
  private messageService = inject(MessagesService);
  messages = signal<Message[]>([]);
  ngOnInit() {
    this.messageService.getMyMessages().subscribe({
      next: (data) => {
        console.log(data);
        this.messages.set(data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
