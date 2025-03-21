# IUT d'Aix Marseille Université - Site d'Arles Département Informatique 2ème année

## R4.A. 11 - Développement pour applications mobiles

## Sujet de projet

## Développement d'une application pour smartphone à destination des parents d'élèves de l'école maternelle «Le petit Prince»

Le but de ce projet est de créer une application pour smartphone à destination de parents d'élèves, permettant à une école maternelle de leur communiquer des informations. Cette école fictive s'appellera «Le petit prince», elle comporte 3 classes, petits, moyens et grands. Les parents pourront se connecter à l'application via un login et un mot de passe, qui leur permettra de voir les informations générales de l'école et les informations de la classe de leur enfant.

Vous utiliserez le framework Ionic. Vous êtes libres du design de l'application, de la disposition des informations, de créer une interface sur une seule page (voir TP 1), ou avec des onglets (voir TP 2), ou avec un menu (voir TP 3).

Vous réaliserez ce projet seul.

### FONCTIONNALITÉS DEMANDÉES :

1. L'application doit avoir une icône et pour nom «Le petit prince».
2. Au lancement, l'utilisateur doit arriver sur un écran de connexion lui demandant d'entrer un login et un mot de passe (qui doit être masqué). Une case à cocher « se souvenir de moi » permettra de sauver ces informations et de préremplir les champs de login et de mot de passe à la connexion suivante.

Les login et mots de passes pour les 3 classes sont les suivants :

|             |  Login  | Mot de passe |
| :---------: | :-----: | :----------: |
| Classe N° 1 | classe1 |     mdp1     |
| Classe N° 2 | classe2 |     mdp2     |
| Classe N° 3 | classe3 |     mdp3     |

Pour établir la connexion, l'application doit récupérer un résultat au format JSON à cette adresse (par exemple pour la classe N° 1) :
https://sebastien-thon.fr/prince/index.php?connexion&login=classe1&mdp=mdp1

1. En cas de connexion correcte le JSON reçu est le suivant :

```json
{
    "resultat": "OK"
}
```

Vous passerez alors à l'écran principal de l'application. 2) Sinon, le JSON reçu est le suivant :

```json
{
    "erreur": "Login ou mot de passe incorrect"
}
```

Vous informerez alors l'utilisateur (avec une boîte d'alerte ou un Toast) et vous resterez sur l'écran de connexion.
https://ionicframework.com/docs/api/toast

3. Lorsque l'utilisateur est connecté, il devra pouvoir voir les informations communiquées par l'école :

-   Articles
-   Galeries d'images
-   Dates importantes
-   Informations de contact

L'application doit récupérer les informations de l'école au format JSON à cette adresse, en fournissant à chaque fois le login et mot de passe (par exemple pour la classe N° 1) :
https://sebastien-thon.fr/prince/index.php?login=classe1&mdp=mdp1

En cas d'erreur, le JSON reçu est le suivant :

```json
{
    "erreur": "Login ou mot de passe incorrect"
}
```

Sinon, le JSON reçu a cette forme :

```json
{
    "articles": [
        {
            "id": 1,
            "titre": "Premier article de la classe 1",
            "date": "2025-01-15T13:28:56Z",
            "categorie": "Information",
            "important": true,
            "classe": 1,
            "texte": "Le texte du premier article.",
            "photos": [
                {
                    "image": "IMG_001.JPG",
                    "legende": "La première photo"
                },
                {
                    "image": "IMG_002.JPG",
                    "legende": "La deuxième photo"
                }
            ]
        },
        {
            "id": 2,
            "titre": "Deuxième article",
            "date": "2025-02-12T10:30:00Z",
            "categorie": "Information",
            "important": false,
            "classe": 0,
            "texte": "Le texte du deuxième article.",
            "photos": [
                {
                    "image": "IMG_003.JPG",
                    "legende": "La troisième photo"
                }
            ]
        },
        {
            "id": 3,
            "titre": "Troisième article",
            "date": "2025-02-19T15:10:30Z",
            "categorie": "Absence",
            "important": true,
            "classe": 1,
            "texte": "Le texte du troisième article.",
            "photos": []
        }
    ],
    "galeries": [
        {
            "titre": "Première galerie",
            "date": "2024-12-03T10:28:56Z",
            "classe": 1,
            "texte": "Le texte de la première galerie",
            "photos": [
                {
                    "image": "IMG_001.JPG",
                    "legende": "La première photo"
                },
                {
                    "image": "IMG_002.JPG",
                    "legende": "La deuxième photo"
                },
                {
                    "image": "IMG_003.JPG",
                    "legende": "La troisième photo"
                }
            ]
        },
        {
            "titre": "Deuxième galerie",
            "date": "2025-01-22T09:05:10Z",
            "classe": 1,
            "texte": "Le texte de la deuxième galerie",
            "photos": [
                {
                    "image": "IMG_004.JPG",
                    "legende": "La quatrième photo"
                },
                {
                    "image": "IMG_005.JPG",
                    "legende": "La cinquième photo"
                },
                {
                    "image": "IMG_006.JPG",
                    "legende": "La sixième photo"
                },
                {
                    "image": "IMG_007.JPG",
                    "legende": "La septième photo"
                }
            ]
        }
    ],
    "dates": [
        {
            "titre": "Première date",
            "date": "2024-11-14T10:00:00Z",
            "classe": 0,
            "texte": "Le texte de la première date"
        },
        {
            "titre": "Deuxième date",
            "date": "2024-12-20T08:00:00Z",
            "classe": 1,
            "texte": "Le texte de la deuxième date"
        },
        {
            "titre": "Troisième date",
            "date": "2025-01-18T13:30:00Z",
            "classe": 1,
            "texte": "Le texte de la troisième date"
        }
    ]
}
```

### Détails des champs :

#### Articles

#### Articles

| Champ     | Signification                                                                                   |
| --------- | ----------------------------------------------------------------------------------------------- |
| id        | Identificateur unique de l'article                                                              |
| titre     | Le titre de l'article                                                                           |
| date      | La date et l'heure de publication de l'article                                                  |
| categorie | La catégorie de l'article («Information», «Absence», «Sortie», «Fête», ...)                     |
| important | Booléen indiquant si l'article est important ou pas (true, false)                               |
| classe    | 0 si l'article concerne toute l'école, ou sinon le numéro de la classe (1, 2, 3)                |
| texte     | Le texte de l'article                                                                           |
| photos    | Tableau de photos contenant des objets avec deux champs :                                       |
|           | - image : le nom du fichier                                                                     |
|           | - legende : la légende de la photo                                                              |
|           | Les fichiers d'images se trouvent dans le répertoire : https://sebastien-thon.fr/prince/images/ |

#### Galeries

| Champ  | Signification                                                                                   |
| ------ | ----------------------------------------------------------------------------------------------- |
| titre  | Le titre de la galerie de photos                                                                |
| date   | La date et l'heure de publication de la galerie                                                 |
| classe | 0 si la galerie concerne toute l'école, ou sinon le numéro de la classe (1, 2, 3)               |
| texte  | Le texte de la galerie                                                                          |
| photos | Tableau de photos contenant des objets avec deux champs :                                       |
|        | - image : le nom du fichier                                                                     |
|        | - legende : la légende de la photo                                                              |
|        | Les fichiers d'images se trouvent dans le répertoire : https://sebastien-thon.fr/prince/images/ |

#### Dates

| Champ  | Signification                                                                  |
| ------ | ------------------------------------------------------------------------------ |
| titre  | Le titre de la date                                                            |
| date   | La date et l'heure                                                             |
| classe | 0 si la date concerne toute l'école, ou sinon le numéro de la classe (1, 2, 3) |
| texte  | Le texte décrivant la date                                                     |

Vous êtes libres de présenter tous ces articles, galeries d'images et dates importantes comme vous le souhaitez.

Pour présenter les articles, vous pouvez utiliser des cards :
https://ionicframework.com/docs/api/card
N'hésitez pas à modifier le style des pages avec les fichiers SCSS, à les enrichir d'images et d'icônes.

4. Vous mettrez en place un mécanisme de pull to refresh pour rafraîchir les listes d'articles, de galeries de photos et de dates (voir TP 2).
   https://ionicframework.com/docs/api/refresher

5. En dessous de chaque article, un bouton (ou une icône, un Checkbox, un Toggle, etc.) permettra de mettre l'article en favori ou de lui retirer ce statut. Dans l'application, il devra être possible de voir la liste de tous les articles favoris. Ce statut doit être persistant (lorsqu'on relance l'application, un article marqué comme favori doit le rester).

6. Au premier lancement de l'application, après l'écran de connexion, vous afficherez un tutorial sous la forme de slides décrivant le fonctionnement de votre application.
   https://ionicframework.com/docs/angular/slides

7. Au début de la page des articles, vous mettrez un champ de recherche qui permettra de filtrer les articles affichés, en n'affichant que ceux qui contiennent les mots entrés (dans le champ titre ou texte).
   https://ionicframework.com/docs/api/searchbar

8. Sur la page de contact, vous mettrez les informations suivantes :

École le Petit Prince
1, rue des écoles
13000 Saint Exupéry
Tél : 0412345678
Mail : contact@lepetitprince.fr

### Critères d'évaluation

Fonctionnalités demandées :

-   L'application doit avoir pour nom «Le petit prince».
-   Au lancement, l'utilisateur doit arriver sur un écran de connexion lui demandant d'entrer un login et un mot de passe (masqué).
-   Une case à cocher «se souvenir de moi» permettra de sauver ces informations et de préremplir les champs de login et de mot de passe à la connexion suivante.
-   Pour établir la connexion, l'application doit récupérer un résultat au format JSON.
-   Si connexion incorrecte vous informerez l'utilisateur (boîte d'alerte ou Toast) et vous resterez sur l'écran de connexion.
-   Récupération des informations de l'école au format JSON.
-   Affichage des articles.
-   Affichage des galeries.
-   Affichage des dates importantes.
-   Modification du style.
-   Vous mettrez en place un mécanisme de pull to refresh pour rafraîchir les listes d'articles, de galeries de photos et de dates.
-   En dessous de chaque article, un bouton (ou une icône, un Checkbox, un Toggle, etc.) permettra de mettre l'article en favori ou de lui retirer ce statut.
-   Dans l'application, il devra être possible de voir la liste de tous les articles favoris. Ce statut doit être persistant.
-   Au premier lancement de l'application, après l'écran de connexion, vous afficherez un tutorial sous la forme de <ion-slides>.
-   Au début de la page des articles, vous mettrez un champ de recherche qui permettra de filtrer les articles affichés.
-   Page de contact.
