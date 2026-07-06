import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { LoginDto } from '../../modules/auth/models/login.dto';
import { AuthResponse } from '../../modules/auth/models/auth-response.model';
import { USERS_MOCK } from '../../shared/mocks/users.mock';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly TOKEN_KEY = 'nyu_token';
  private readonly USER_KEY  = 'nyu_user';
  private readonly apiUrl    = environment.apiUrl;

  private useMock = false;
  
  private _isLoggedIn$  = new BehaviorSubject<boolean>(false);
  private _currentUser$ = new BehaviorSubject<any>(null);

  isLoggedIn$  = this._isLoggedIn$.asObservable();
  currentUser$ = this._currentUser$.asObservable();

  constructor(private http: HttpClient) {}

  checkSession(): void {
    const token = this.getToken();
    const user  = this.getStoredUser();

    if (token && user) {
      this._isLoggedIn$.next(true);
      this._currentUser$.next(user);
    }
  }

  login(dto: LoginDto): Observable<AuthResponse> {
    if (this.useMock) {
      const found = USERS_MOCK.find(
        u => u.email === dto.email && u.password === dto.password
      );

      if (!found) {
        return throwError(() => new Error('Credenciales incorrectas.'));
      }

      const mockResponse: AuthResponse = {
        token: `mock-jwt-token-${found.id}-${Date.now()}`,
        user: {
          id: found.id,
          name: found.name,
          email: found.email,
          role: found.role,
          service: found.service
        }
      };

      localStorage.setItem(this.TOKEN_KEY, mockResponse.token);
      localStorage.setItem(this.USER_KEY, JSON.stringify(mockResponse.user));

      this._isLoggedIn$.next(true);
      this._currentUser$.next(mockResponse.user);

      return of(mockResponse);
    }

    /*return this.http.post<any>(
      `${this.apiUrl}/auth/login`,
      dto
    ).pipe(
      map(res => {
        const authResponse: AuthResponse = {
          token: res.access_token,
          user: {
            id: 1,
            name: 'admin',
            email: dto.email,
            role: 'ADMIN',
            service: 'MATRICULA'
          }
        };

        return authResponse;
      }),
      tap(res => {
        localStorage.setItem(this.TOKEN_KEY, res.token);
        localStorage.setItem(this.USER_KEY, JSON.stringify(res.user));

        this._isLoggedIn$.next(true);
        this._currentUser$.next(res.user);
      })
    );
  }*/
  

  return this.http.post<any>(
    `${this.apiUrl}/auth/login`,
    dto
  ).pipe(
    map(res => {
      // Decodifica el JWT para obtener datos reales
      const payload = JSON.parse(atob(res.access_token.split('.')[1]));

      const authResponse: AuthResponse = {
        token: res.access_token,
        user: {
          id:    payload.sub,
          name:  payload.name || payload.email.split('@')[0],
          email: payload.email,
          role:  payload.role || 'ADMIN'
        }
      };
      return authResponse;
    }),
    tap(res => {
      localStorage.setItem(this.TOKEN_KEY, res.token);
      localStorage.setItem(this.USER_KEY, JSON.stringify(res.user));
      this._isLoggedIn$.next(true);
      this._currentUser$.next(res.user);
    })
  );
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);

    this._isLoggedIn$.next(false);
    this._currentUser$.next(null);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getCurrentUser(): any {
    return this.getStoredUser();
  }

  private getStoredUser(): any {
    const raw = localStorage.getItem(this.USER_KEY);
    return raw ? JSON.parse(raw) : null;
  }
}