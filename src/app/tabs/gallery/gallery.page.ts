import { Component } from '@angular/core';
import { SchoolService } from '@/services/school.service';
import { Gallery } from '@/interfaces/school-data';
import { Observable, map } from 'rxjs';

@Component({
    selector: 'app-gallery',
    templateUrl: './gallery.page.html',
    styleUrls: ['./gallery.page.scss'],
    standalone: false,
})
export class GalleryPage {
    galleries$: Observable<Gallery[]>;

    constructor(private schoolService: SchoolService) {
        this.galleries$ = this.schoolService
            .getData()
            .pipe(
                map(
                    (data) =>
                        data?.galeries?.sort(
                            (a, b) =>
                                new Date(b.date).getTime() -
                                new Date(a.date).getTime()
                        ) ?? []
                )
            );
        // Debug : afficher les galeries reçues
        this.galleries$.subscribe((galleries) => {
            console.log('Galeries reçues : ', galleries);
        });
    }

    handleRefresh(event: any) {
        this.schoolService.refresh().subscribe(() => {
            event.target.complete();
        });
    }
}
