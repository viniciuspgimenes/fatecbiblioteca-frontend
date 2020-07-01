import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  menuItems: { name: string; url: string }[] = [
    {name: 'Livros', url: '/livros'},
    {name: 'Leitores', url: '/leitores'},
    {name: 'Emprestimos', url: '/emprestimos'},
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
