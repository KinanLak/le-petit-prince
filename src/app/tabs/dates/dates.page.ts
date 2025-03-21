import { Component, OnInit } from '@angular/core';
import { ImportantDate } from '@/interfaces/school-data';
import { SchoolService } from '@/services/school.service';

@Component({
    selector: 'app-dates',
    templateUrl: './dates.page.html',
    styleUrls: ['./dates.page.scss'],
    standalone: false,
})
export class DatesPage implements OnInit {
    dates: ImportantDate[] = [];

    constructor(private schoolService: SchoolService) {}

    ngOnInit() {

        this.schoolService.getData().subscribe((data) => {
            if (data) {
                this.dates = data.dates || [];
            }
        });
    }

    doRefresh(event: any) {
        this.schoolService.getData().subscribe(
            (data) => {
                this.dates = data ? data.dates : [];
                event.target.complete();
            },
            (error) => {
                console.error(
                    'Erreur lors de l\'actualisation des dates',
                    error
                );
                event.target.complete();
            }
        );
    }
}
