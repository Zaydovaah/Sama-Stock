import { environment } from './../../environments/environment';
import { Product } from './../models/product';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

   httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  addProduct(product: Product): Observable<any> {
    return this.http.post<Product>('http://localhost:3000/api/create-product', product, this.httpOptions)
      .pipe(
        catchError(this.handleError<Product>('Add Product'))
      );
  }

  getProduct(id): Observable<Product> {
    return this.http.get<Product>(`${environment.baseUrl}/api/products/${id}`)
      .pipe(
        tap(_ => console.log(`Product fetched: ${id}`)),
        catchError(this.handleError<Product>(`Get Product id=${id}`))
      );
  }

  getFeaturedProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.baseUrl}/api/products?isFeatured=true`)
      .pipe(
        tap(products => console.log('Featured products fetched!')),
        catchError(this.handleError<Product[]>('Get Featured Products', []))
      );
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.baseUrl}/api/products`)
      .pipe(
        tap(products => console.log('Products fetched!')),
        catchError(this.handleError<Product[]>('Get Products', []))
      );
  }

  updateProduct(id, product: Product): Observable<any> {
    return this.http.put('http://localhost:3000/api/update-product/' + id, product, this.httpOptions)
      .pipe(
        tap(_ => console.log(`Product updated: ${id}`)),
        catchError(this.handleError<Product[]>('Update Product'))
      );
  }

  deleteProduct(id): Observable<Product[]> {
    return this.http.delete<Product[]>('http://localhost:3000/api/delete-product/' + id, this.httpOptions)
      .pipe(
        tap(_ => console.log(`Product deleted: ${id}`)),
        catchError(this.handleError<Product[]>('Delete Product'))
      );
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
