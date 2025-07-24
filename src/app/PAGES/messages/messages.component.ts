import { Component, inject, OnInit } from '@angular/core';
import { MessagesService } from '../../../SERVICES/MESSAGES/messages.service';

@Component({
  selector: 'app-messages',
  imports: [],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css'
})
export class MessagesComponent implements OnInit{
  private messageService = inject(MessagesService)
  
  ngOnInit() {
   
  }
}
