import { Component, OnInit } from '@angular/core';
import { SchoolService } from '@/services/school.service';
import { Article } from '@/interfaces/school-data';
import { Observable, map } from 'rxjs';

@Component({
    selector: 'app-articles',
    templateUrl: './articles.page.html',
    styleUrls: ['./articles.page.scss'],
    standalone: false,
})
export class ArticlesPage implements OnInit {
    articles$: Observable<Article[]>;
    searchTerm = '';
    showFavorites = false;
    favorites: string[] = []; // stocke les identifiants (ici le titre) des articles favoris

    constructor(private schoolService: SchoolService) {
        const fav = localStorage.getItem('favorites');
        this.favorites = fav ? JSON.parse(fav) : [];
        this.articles$ = this.schoolService.getData().pipe(
            map((data) => {
                const articles = data?.articles || [];
                articles.forEach((article) => {
                    // Marquer comme favori si présent dans le tableau
                    article.isFavorite = this.favorites.includes(article.titre);
                });
                return articles.sort(
                    (a, b) =>
                        new Date(b.date).getTime() - new Date(a.date).getTime()
                );
            })
        );
    }

    ngOnInit() {
        // Debug : afficher les articles reçus
        this.articles$.subscribe((articles) => {
            console.log('Articles reçus : ', articles);
        });
    }

    handleRefresh(event: any) {
        this.schoolService.refresh().subscribe(() => {
            event.target.complete();
        });
    }

    toggleFavorite(article: Article) {
        if (article.isFavorite) {
            article.isFavorite = false;
            this.favorites = this.favorites.filter(
                (id) => id !== article.titre
            );
        } else {
            article.isFavorite = true;
            this.favorites.push(article.titre);
        }
        localStorage.setItem('favorites', JSON.stringify(this.favorites));
    }

    toggleViewFavorites() {
        this.showFavorites = !this.showFavorites;
    }

    filterArticles(articles: Article[]): Article[] {
        let filtered = articles;
        if (this.searchTerm) {
            const search = this.searchTerm.toLowerCase();
            filtered = filtered.filter(
                (article) =>
                    article.titre.toLowerCase().includes(search) ||
                    article.texte.toLowerCase().includes(search)
            );
        }
        if (this.showFavorites) {
            filtered = filtered.filter((article) => article.isFavorite);
        }
        return filtered;
    }
}
