import { Component, OnInit } from '@angular/core';
import addDays from 'date-fns/addDays';
import formatDistance from 'date-fns/formatDistance';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  comments = [
    {
      author: 'Yves E.',
      avatar: 'https://previews.123rf.com/images/avemario/avemario1606/avemario160600584/58980459-demi-profil-tir%C3%A9-d-un-jeune-homme-africain-attrayant-avec-de-la-moustache-et-de-la-barbe-dans-des-v.jpg',
      content:
        "Vraiment ravis de disposer des services de Gas & Oil a korhogo",
      datetime: formatDistance(new Date(), addDays(new Date(), 1))
    },
    {
      author: 'Han Solo',
      avatar: 'https://previews.123rf.com/images/trish233/trish2331503/trish233150300035/37384799-profil-de-sourire-m%C3%A2le-africaine.jpg',
      content:
      "Service impeccable ! j'ai été agréablement surpris par le professionnalisme des agents de la station",
      datetime: formatDistance(new Date(), addDays(new Date(), 2))
    }
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
