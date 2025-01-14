// password-reset.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PasswordResetService {
  private resetCodeSubject = new BehaviorSubject<string | null>(null);
  resetCode$ = this.resetCodeSubject.asObservable();

  // Méthode pour simuler l'envoi d'un email avec le code de réinitialisation
  sendResetCode(email: string): Observable<string> {
    const generatedCode = this.generateResetCode();
    console.log(`Sending reset code ${generatedCode} to ${email}`); // Simule l'envoi de l'email
    this.resetCodeSubject.next(generatedCode);
    
    // Retourne un Observable avec un délai simulé pour l'envoi de l'email
    return of(`Reset code sent to ${email}: ${generatedCode}`).pipe(delay(1000)); // Simule un délai d'1 seconde
  }

  // Générer un code de réinitialisation aléatoire (simple exemple)
  private generateResetCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  // Vérifier si le code entré est correct
  verifyResetCode(codeEntered: string): Observable<string> {
    const validCode = this.resetCodeSubject.value;
    if (validCode && codeEntered === validCode) {
      console.log('Reset code is valid');
      return of('Reset code is valid').pipe(delay(500));  // Retourne un Observable avec un message
    } else {
      console.log('Invalid reset code');
      return of('Invalid reset code. Please try again.').pipe(delay(500)); // Retourne un message d'erreur
    }
  }

  // Mettre à jour le mot de passe si le code est valide
  updatePassword(newPassword: string): Observable<string> {
    const validCode = this.resetCodeSubject.value;
    if (validCode) {
      console.log(`Password updated to: ${newPassword}`);
      this.resetCodeSubject.next(null);  // Reset le code après utilisation
      return of('Password updated successfully').pipe(delay(500)); // Retourne un message de succès
    } else {
      console.log('No valid reset code found');
      return of('Failed to update password. Invalid reset code.').pipe(delay(500)); // Message d'erreur
    }
  }
}
