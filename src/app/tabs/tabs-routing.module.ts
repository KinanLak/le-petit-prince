import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
    {
        path: '',
        component: TabsPage,
        children: [
            {
                path: 'articles',
                loadChildren: () =>
                    import('./articles/articles.module').then(
                        (m) => m.ArticlesPageModule
                    ),
            },
            {
                path: 'gallery',
                loadChildren: () =>
                    import('./gallery/gallery.module').then(
                        (m) => m.GalleryPageModule
                    ),
            },
            {
                path: 'dates',
                loadChildren: () =>
                    import('./dates/dates.module').then(
                        (m) => m.DatesPageModule
                    ),
            },
            {
                path: 'contact',
                loadChildren: () =>
                    import('./contact/contact.module').then(
                        (m) => m.ContactPageModule
                    ),
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TabsPageRoutingModule {}
