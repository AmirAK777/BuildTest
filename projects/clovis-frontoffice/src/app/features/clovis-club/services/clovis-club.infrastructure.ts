import { Injectable } from "@angular/core";
import { delay, Observable, of } from "rxjs";
import { Modals } from "../models";

const fakeService: ClovisClubInfrastructure = {
    getAll(): Observable<Modals> {
        const modals: Modals = [
            {
                id: 1,
                chip: 'auth',
                modalName: 'loginSuccess',
                title: 'Connexion réussie',
                content: 'Bienvenue sur Clovis Club!',
                description: 'Vous vous êtes connecté avec succès.',
                button: {
                    id: 'loginSuccess',
                    title: 'Expert patrimonial dédié',
                    detail: 'Obtenez une vue complète de votre patrimoine pour optimiser votre stratégie financière.'
                }
            },
            {
                id: 2,
                chip: '',
                modalName: 'loginError',
                title: 'Erreur de connexion',
                content: 'Email ou mot de passe incorrect.',
                description: 'Veuillez vérifier vos identifiants et réessayer.',
                button: {
                    id: 'loginError',
                    title: 'Analyse patrimoniale',
                    detail: 'Obtenez une vue complète de votre patrimoine pour optimiser votre stratégie financière.'
                }
            },
            {
                id: 3,
                chip: '',
                modalName: 'zzczc',
                title: 'Erreur dzdzdzdzd connexion',
                content: 'Email ou dzdzdzd de passe incorrect.',
                description: 'Veuillez vérifier vos identifiants et réessayer.',
                button: {
                    id: 'zzczc',
                    title: 'Analyse patrimoniale',
                    detail: 'Obtenez une vue complète de votre patrimoine pour optimiser votre stratégie financière.'
                }
            },
        ];

        return of(modals);
    }
};
@Injectable({
    providedIn: 'root',
    useValue: fakeService
})
export class ClovisClubInfrastructure {
    getAll(): Observable<Modals> {
        throw new Error('Not implemented exception');
    }
}