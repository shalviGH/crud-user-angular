import { computed, inject, Injectable, signal } from "@angular/core";
import { User, UsersResponse } from "../interfaces/User-Response";
import { HttpClient } from "@angular/common/http";
import { delay, map, Observable } from "rxjs";

interface State{
    users: User[],
    loading: boolean;
}

@Injectable({
    providedIn: 'root'
})

export class UserService{
    private http = inject(HttpClient);

    #state = signal<State>({
        loading: true,
        users: [],
    });

    users2: User[] = [];

    public users = computed( ()=> this.#state().users );
    public loading = computed( ()=> this.#state().loading );


    constructor() { 

        this.getUsers();


        // this.http.get<User[]>('http://localhost:8095/students/v1/api/')
        // .pipe(delay(1500))
        // .subscribe( res =>{


        //   this.#state.set({
        //     loading: false,
        //     users: res,
        //   })
        // }
    
        // )
        
      }

      getUsers(){

       return  this.http.get<User[]>('http://localhost:8095/students/v1/api/')
        .pipe(delay(1500))
        .subscribe( res =>{

          this.#state.set({
            loading: false,
            users: res,
          })
        })
    

      }



      createUse(user: User){

        return this.http.post<User>(`http://localhost:8095/students/v1/api`, user).pipe(
            delay(1500), // Retrasa la respuesta 1.5 segundos
            map(resp => ({
              id: resp.lastname,
              name: resp.firstname,
              job: resp.address
            })),
            
            
            // Retorna solo los datos relevantes
          );

          
        
       }



        // Método para crear un nuevo usuario
        createUser(user: User) {
            return this.http.post<User>('http://localhost:8095/students/v1/api', user).pipe(
                delay(1500),
                map(resp => ({
                    id: resp.lastname,
                    name: resp.firstname,
                    job: resp.address
                }))
            );
        }

        getUserById(id: number){
            return this.http.get<User>(`http://localhost:8095/students/v1/api/${id}`)
             .pipe(delay(1500),
               map(resp => resp)
             )
            
        }


        deleteUser(id: number): Observable<void> {
            return this.http.delete<void>(`http://localhost:8095/students/v1/api/${id}`, { responseType: 'text' as 'json' });
        }


         // Método para crear un nuevo usuario
        updateUser(user: User, id: number) {
           return this.http.put<User>(`http://localhost:8095/students/v1/api/${id}`, user).pipe(
              delay(1000),
              map(resp => ({
                  id: resp.lastname,
                  name: resp.firstname,
                  adress: resp.address
              }))
          );
      }



}