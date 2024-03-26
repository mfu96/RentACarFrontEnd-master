import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.css']
})
export class HomeScreenComponent implements OnInit {

  cards = [
    {
      imageUrl: "https://i.gazeteoksijen.com/wp-content/uploads/2021/02/Swissotel_Buyuk_Efes_1200_798.jpg",
      title: 'Web Site 1',
      description: 'Tanıtım için',
      link: 'https://www.example.com/page1'
    },
    {
      imageUrl: 'https://img.aydinlik.com.tr/rcman/Cw1280h720q95gc/storage/files/images/2023/06/06/istanbulun-en-iyi-otelleri-istanbul-en-iyi-oteller-istanbul-otelleri-istanbul-otel-fiyatlari-istanbul-otel-istanbul-oteller-hilton-otel-bomonti-ciragan-EeOU.jpg',
      title: 'Web Site 2',
      description: 'Tanıtım için',
      link: 'https://www.example.com/page2'
    },
    // Diğer kartlar...
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
