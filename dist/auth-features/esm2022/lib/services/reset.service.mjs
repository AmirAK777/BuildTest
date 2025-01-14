// password-reset.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import * as i0 from "@angular/core";
export class PasswordResetService {
    constructor() {
        this.resetCodeSubject = new BehaviorSubject(null);
        this.resetCode$ = this.resetCodeSubject.asObservable();
    }
    // Méthode pour simuler l'envoi d'un email avec le code de réinitialisation
    sendResetCode(email) {
        const generatedCode = this.generateResetCode();
        console.log(`Sending reset code ${generatedCode} to ${email}`); // Simule l'envoi de l'email
        this.resetCodeSubject.next(generatedCode);
        // Retourne un Observable avec un délai simulé pour l'envoi de l'email
        return of(`Reset code sent to ${email}: ${generatedCode}`).pipe(delay(1000)); // Simule un délai d'1 seconde
    }
    // Générer un code de réinitialisation aléatoire (simple exemple)
    generateResetCode() {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }
    // Vérifier si le code entré est correct
    verifyResetCode(codeEntered) {
        const validCode = this.resetCodeSubject.value;
        if (validCode && codeEntered === validCode) {
            console.log('Reset code is valid');
            return of('Reset code is valid').pipe(delay(500)); // Retourne un Observable avec un message
        }
        else {
            console.log('Invalid reset code');
            return of('Invalid reset code. Please try again.').pipe(delay(500)); // Retourne un message d'erreur
        }
    }
    // Mettre à jour le mot de passe si le code est valide
    updatePassword(newPassword) {
        const validCode = this.resetCodeSubject.value;
        if (validCode) {
            console.log(`Password updated to: ${newPassword}`);
            this.resetCodeSubject.next(null); // Reset le code après utilisation
            return of('Password updated successfully').pipe(delay(500)); // Retourne un message de succès
        }
        else {
            console.log('No valid reset code found');
            return of('Failed to update password. Invalid reset code.').pipe(delay(500)); // Message d'erreur
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: PasswordResetService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: PasswordResetService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: PasswordResetService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzZXQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2F1dGgtZmVhdHVyZXMvc3JjL2xpYi9zZXJ2aWNlcy9yZXNldC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLDRCQUE0QjtBQUM1QixPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxlQUFlLEVBQWMsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3ZELE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7QUFLdkMsTUFBTSxPQUFPLG9CQUFvQjtJQUhqQztRQUlVLHFCQUFnQixHQUFHLElBQUksZUFBZSxDQUFnQixJQUFJLENBQUMsQ0FBQztRQUNwRSxlQUFVLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFlBQVksRUFBRSxDQUFDO0tBeUNuRDtJQXZDQywyRUFBMkU7SUFDM0UsYUFBYSxDQUFDLEtBQWE7UUFDekIsTUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDL0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsYUFBYSxPQUFPLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyw0QkFBNEI7UUFDNUYsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUUxQyxzRUFBc0U7UUFDdEUsT0FBTyxFQUFFLENBQUMsc0JBQXNCLEtBQUssS0FBSyxhQUFhLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLDhCQUE4QjtJQUM5RyxDQUFDO0lBRUQsaUVBQWlFO0lBQ3pELGlCQUFpQjtRQUN2QixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxNQUFNLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNoRSxDQUFDO0lBRUQsd0NBQXdDO0lBQ3hDLGVBQWUsQ0FBQyxXQUFtQjtRQUNqQyxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDO1FBQzlDLElBQUksU0FBUyxJQUFJLFdBQVcsS0FBSyxTQUFTLEVBQUUsQ0FBQztZQUMzQyxPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDLENBQUM7WUFDbkMsT0FBTyxFQUFFLENBQUMscUJBQXFCLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBRSx5Q0FBeUM7UUFDL0YsQ0FBQzthQUFNLENBQUM7WUFDTixPQUFPLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDLENBQUM7WUFDbEMsT0FBTyxFQUFFLENBQUMsdUNBQXVDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQywrQkFBK0I7UUFDdEcsQ0FBQztJQUNILENBQUM7SUFFRCxzREFBc0Q7SUFDdEQsY0FBYyxDQUFDLFdBQW1CO1FBQ2hDLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUM7UUFDOUMsSUFBSSxTQUFTLEVBQUUsQ0FBQztZQUNkLE9BQU8sQ0FBQyxHQUFHLENBQUMsd0JBQXdCLFdBQVcsRUFBRSxDQUFDLENBQUM7WUFDbkQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFFLGtDQUFrQztZQUNyRSxPQUFPLEVBQUUsQ0FBQywrQkFBK0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLGdDQUFnQztRQUMvRixDQUFDO2FBQU0sQ0FBQztZQUNOLE9BQU8sQ0FBQyxHQUFHLENBQUMsMkJBQTJCLENBQUMsQ0FBQztZQUN6QyxPQUFPLEVBQUUsQ0FBQyxnREFBZ0QsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLG1CQUFtQjtRQUNuRyxDQUFDO0lBQ0gsQ0FBQzsrR0ExQ1Usb0JBQW9CO21IQUFwQixvQkFBb0IsY0FGbkIsTUFBTTs7NEZBRVAsb0JBQW9CO2tCQUhoQyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbIi8vIHBhc3N3b3JkLXJlc2V0LnNlcnZpY2UudHNcclxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIE9ic2VydmFibGUsIG9mIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IGRlbGF5IH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290JyxcclxufSlcclxuZXhwb3J0IGNsYXNzIFBhc3N3b3JkUmVzZXRTZXJ2aWNlIHtcclxuICBwcml2YXRlIHJlc2V0Q29kZVN1YmplY3QgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZyB8IG51bGw+KG51bGwpO1xyXG4gIHJlc2V0Q29kZSQgPSB0aGlzLnJlc2V0Q29kZVN1YmplY3QuYXNPYnNlcnZhYmxlKCk7XHJcblxyXG4gIC8vIE3DqXRob2RlIHBvdXIgc2ltdWxlciBsJ2Vudm9pIGQndW4gZW1haWwgYXZlYyBsZSBjb2RlIGRlIHLDqWluaXRpYWxpc2F0aW9uXHJcbiAgc2VuZFJlc2V0Q29kZShlbWFpbDogc3RyaW5nKTogT2JzZXJ2YWJsZTxzdHJpbmc+IHtcclxuICAgIGNvbnN0IGdlbmVyYXRlZENvZGUgPSB0aGlzLmdlbmVyYXRlUmVzZXRDb2RlKCk7XHJcbiAgICBjb25zb2xlLmxvZyhgU2VuZGluZyByZXNldCBjb2RlICR7Z2VuZXJhdGVkQ29kZX0gdG8gJHtlbWFpbH1gKTsgLy8gU2ltdWxlIGwnZW52b2kgZGUgbCdlbWFpbFxyXG4gICAgdGhpcy5yZXNldENvZGVTdWJqZWN0Lm5leHQoZ2VuZXJhdGVkQ29kZSk7XHJcbiAgICBcclxuICAgIC8vIFJldG91cm5lIHVuIE9ic2VydmFibGUgYXZlYyB1biBkw6lsYWkgc2ltdWzDqSBwb3VyIGwnZW52b2kgZGUgbCdlbWFpbFxyXG4gICAgcmV0dXJuIG9mKGBSZXNldCBjb2RlIHNlbnQgdG8gJHtlbWFpbH06ICR7Z2VuZXJhdGVkQ29kZX1gKS5waXBlKGRlbGF5KDEwMDApKTsgLy8gU2ltdWxlIHVuIGTDqWxhaSBkJzEgc2Vjb25kZVxyXG4gIH1cclxuXHJcbiAgLy8gR8OpbsOpcmVyIHVuIGNvZGUgZGUgcsOpaW5pdGlhbGlzYXRpb24gYWzDqWF0b2lyZSAoc2ltcGxlIGV4ZW1wbGUpXHJcbiAgcHJpdmF0ZSBnZW5lcmF0ZVJlc2V0Q29kZSgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIE1hdGguZmxvb3IoMTAwMDAwICsgTWF0aC5yYW5kb20oKSAqIDkwMDAwMCkudG9TdHJpbmcoKTtcclxuICB9XHJcblxyXG4gIC8vIFbDqXJpZmllciBzaSBsZSBjb2RlIGVudHLDqSBlc3QgY29ycmVjdFxyXG4gIHZlcmlmeVJlc2V0Q29kZShjb2RlRW50ZXJlZDogc3RyaW5nKTogT2JzZXJ2YWJsZTxzdHJpbmc+IHtcclxuICAgIGNvbnN0IHZhbGlkQ29kZSA9IHRoaXMucmVzZXRDb2RlU3ViamVjdC52YWx1ZTtcclxuICAgIGlmICh2YWxpZENvZGUgJiYgY29kZUVudGVyZWQgPT09IHZhbGlkQ29kZSkge1xyXG4gICAgICBjb25zb2xlLmxvZygnUmVzZXQgY29kZSBpcyB2YWxpZCcpO1xyXG4gICAgICByZXR1cm4gb2YoJ1Jlc2V0IGNvZGUgaXMgdmFsaWQnKS5waXBlKGRlbGF5KDUwMCkpOyAgLy8gUmV0b3VybmUgdW4gT2JzZXJ2YWJsZSBhdmVjIHVuIG1lc3NhZ2VcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdJbnZhbGlkIHJlc2V0IGNvZGUnKTtcclxuICAgICAgcmV0dXJuIG9mKCdJbnZhbGlkIHJlc2V0IGNvZGUuIFBsZWFzZSB0cnkgYWdhaW4uJykucGlwZShkZWxheSg1MDApKTsgLy8gUmV0b3VybmUgdW4gbWVzc2FnZSBkJ2VycmV1clxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gTWV0dHJlIMOgIGpvdXIgbGUgbW90IGRlIHBhc3NlIHNpIGxlIGNvZGUgZXN0IHZhbGlkZVxyXG4gIHVwZGF0ZVBhc3N3b3JkKG5ld1Bhc3N3b3JkOiBzdHJpbmcpOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xyXG4gICAgY29uc3QgdmFsaWRDb2RlID0gdGhpcy5yZXNldENvZGVTdWJqZWN0LnZhbHVlO1xyXG4gICAgaWYgKHZhbGlkQ29kZSkge1xyXG4gICAgICBjb25zb2xlLmxvZyhgUGFzc3dvcmQgdXBkYXRlZCB0bzogJHtuZXdQYXNzd29yZH1gKTtcclxuICAgICAgdGhpcy5yZXNldENvZGVTdWJqZWN0Lm5leHQobnVsbCk7ICAvLyBSZXNldCBsZSBjb2RlIGFwcsOocyB1dGlsaXNhdGlvblxyXG4gICAgICByZXR1cm4gb2YoJ1Bhc3N3b3JkIHVwZGF0ZWQgc3VjY2Vzc2Z1bGx5JykucGlwZShkZWxheSg1MDApKTsgLy8gUmV0b3VybmUgdW4gbWVzc2FnZSBkZSBzdWNjw6hzXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmxvZygnTm8gdmFsaWQgcmVzZXQgY29kZSBmb3VuZCcpO1xyXG4gICAgICByZXR1cm4gb2YoJ0ZhaWxlZCB0byB1cGRhdGUgcGFzc3dvcmQuIEludmFsaWQgcmVzZXQgY29kZS4nKS5waXBlKGRlbGF5KDUwMCkpOyAvLyBNZXNzYWdlIGQnZXJyZXVyXHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==