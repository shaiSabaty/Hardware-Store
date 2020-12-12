import {Injectable} from '@angular/core';
import { HttpClient, HttpResponse} from '@angular/common/http';
import { AuthData } from './auth-data.model';
import { Observable, Subject, throwError } from 'rxjs';
import { Route } from '@angular/compiler/src/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ThrowStmt } from '@angular/compiler';
import {MatDialog} from '@angular/material/dialog';
import { useAnimation } from '@angular/animations';
import { DialogMessageComponent } from './dialog-message/dialog-message.component';
import { map, catchError, first } from 'rxjs/operators';
import * as jwt_decode from "jwt-decode";

import createAuth0Client from '@auth0/auth0-spa-js';
import Auth0Client from '@auth0/auth0-spa-js/dist/typings/Auth0Client';
import { from, of, BehaviorSubject, combineLatest } from 'rxjs';
import { tap, concatMap, shareReplay } from 'rxjs/operators';
import { User } from 'firebase';
import { Address } from '../auth/Address-data.model';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';




@Injectable({providedIn:"root"})
 export class AuthService{
     
    public token: string;
    public authData : AuthData;
    public users : AuthData [];
    private tokenTimer : any;
    public errorMessage ="";
    address:Address;
    orderHistory :any;
    private authStatusListner = new Subject<boolean>();
   private isAuthenticated = false;
   Cart :any;
   fromData : string;
   toData : string;
   
  //gpus: Gpu [] = [];
  private UsersUpdated = new Subject<AuthData[]>();
  private user = new Subject<AuthData>();


    constructor(public http : HttpClient,private router:Router,public dialog:MatDialog,public activeRoute : ActivatedRoute){

         // On initial load, check authentication state with authorization server
    // Set up local auth streams if user is already authenticated
    this.localAuthSetup();
    // Handle redirect from Auth0 login
   // this.handleAuthCallback();
     }

   openDialog(){
     let dialogRef=this.dialog.open(DialogMessageComponent,
        {
            data:this.errorMessage
        });
     dialogRef.afterClosed().subscribe(res=>{
       console.log("dialog res is " + res);
       if (res === 'closed') {
        this.router.navigate(['signup']);
   }
     });
   }

    getAuthStatusListner(){
        return this.authStatusListner.asObservable();
    }

    getToken() {
        //console.log(this.token2);
        return this.token;
    }
     setFromUser(from : string){
      this.fromData = from;
     }

    resetPassword(email:string){
      //const user = {email:email};

       this.http.get<{user:User}>("http://localhost:4500/user/info/" + email).subscribe(data=>{
      
        try{
         
            alert("message send to " + data.user.email + "to create a new password");
           
            this.http.post<{from:string,to:string}>("http://localhost:4500/user/send-mail-create-new-password",data.user).subscribe(data=>{
             this.fromData=data.from;
              this.toData = data.to;
             
              alert("message sent from : "+  this.fromData+ " to :" + this.toData );
              this.router.navigate(['/home']);
           
           });

           
            

        }catch(err){
          alert("email not exist try again");
          //location.href = '/forgot';
          location.href = "/forgot";
        }
         
    
      });
    
      
    }

    contactUs(email:string , phoneNumber : string , message : string,firstName:string,lastName:string){
     
      
     
      const userMessage = {email:email,phoneNumber:phoneNumber,message:message,firstName:firstName,lastName:lastName};
      this.http.post<{from:string,phoneNumber:string,message:string,firstName:string,lastName:string}>("http://localhost:4500/user/contact-us",userMessage).subscribe(data=>{
       
      firstName = data.firstName
      });
      
       this.router.navigate(["/"]);

    }

    createNewPassword(password:string,passwordConfirm:string,_id:string){
      if(password!==passwordConfirm){
        alert("password not match,try again");

      
     


        location.href = '/create-new-password/' + _id;
        
      }else{
        alert("password match");
        
        this.http.get<{firstName:string
          ,lastName:string,
          phoneNumber:string,
          userName:string,
          email:string}>("http://localhost:4500/user/"+_id).subscribe(data=>{
          
            
            this.http.put<{password:string}>("http://localhost:4500/user/info/info/info/create-password/"+_id+"/" + password,data).subscribe(data=>{
             // console.log(data.password);
              alert("im hereeeee");
              
            });

        });
       
     //   .subscribe(data=>{
          // data.password = password;
          // console.log(password);
          // alert(password);
       // });
      }
      alert("Your password changed ")
      this.router.navigate(['/login']);
    }
    getIsAuth(){
        return this.isAuthenticated;
    }
    LogOut(){
      this.token = null;
      this.isAuthenticated = false;
      this.authStatusListner.next(false);
      clearTimeout(this.tokenTimer);
     this.http.get("http://localhost:4500/user/logout").subscribe(data=>{
     console.log("logging out");  
     console.log(data);
     
     })
     this.clearOfData();
      this.router.navigate(["/"]);
    }

    getUserData(){
     
    }
    createUser(email:string,password: string,firstName: string,lastName: string,phoneNumber: string,userName:string,address : Address){
         const authData : AuthData = {_id:"",email:email,password:password,
         firstName:firstName,lastName:lastName,phoneNumber:phoneNumber
         ,userName:userName,googleId:"",imagePath:"",isActive:false,orderHistory:null,Cart:null,address:address,role:""};
        //   this.http.post("http://localhost:4500/user/signup",authData).subscribe(res=>{
   
        //       console.log(res);

        //   });



        const userData = new FormData();
       // userData.append("_id",null);
        userData.append("firstName",firstName);
        userData.append("lastName",lastName);
        // gpuData.append("imgPath",imgPath);
        userData.append("phoneNumber",phoneNumber);
        userData.append("userName",userName);
        userData.append("password",password);
        userData.append("email",email);
        

        this.http.post<{user: AuthData}>('http://localhost:4500/user/signup',userData).subscribe(data=>{
            // const user: AuthData = {_id:"",firstName:firstName,lastName:lastName,phoneNumber:phoneNumber,
            //     userName:userName,password:password,email:email
            // };
            console.log(authData);
        //     this.saveDataInLocalStorage(email,firstName,lastName,phoneNumber,userName);
        //   this.users.push(authData);
        //   this.UsersUpdated.next([...this.users]);
        //    this.router.navigate(["/users"]);
        });
       
    }

    createUser1(email:string,password: string,firstName: string,lastName: string,phoneNumber: string,userName:string,role:string){

        // const authData = new FormData();
        // // userData.append("_id",null);
        //  userData.append("firstName",firstName);
        //  userData.append("lastName",lastName);
        //  // gpuData.append("imgPath",imgPath);
        //  userData.append("phoneNumber",phoneNumber);
        //  userData.append("userName",userName);
        //  userData.append("password",password);
        //  userData.append("email",email);

      

         
         const authData : AuthData = {_id:"",email:email,password:password,firstName:firstName,lastName:lastName,phoneNumber:phoneNumber,userName:userName,googleId:"",imagePath:"",Cart:this.Cart,isActive:false,orderHistory:this.orderHistory,address:this.address,role:role};
          this.http.post<{user:AuthData,message:string}>("http://localhost:4500/user/signup",authData).subscribe(res=>{
           this.saveDataInLocalStorage(email,firstName,lastName,phoneNumber,userName);
             //alert(res.message);
             if(this.errorMessage!==undefined){
                this.checkError(res.message);
             }
                
             
             
          });

          this.http.post<{from:string,to:string}>("http://localhost:4500/user/sendmail",authData).subscribe(data=>{
                   this.fromData=data.from;
                   this.toData = data.to;
                   //console.log(data.user);
                   alert("message sent from : "+  this.fromData+ " to :" + this.toData );
                });

                //alert("message sent from : "+ this.fromData+ " to :" + email );

        
         
    }

    getUserByEmail(email:string){
       
        return this.http.get<{user:AuthData}>('http://localhost:4500/user/info/'+email);
    }

    
    logIn(email:string,password: string){
     // alert("clicked")
        //get user by email
        //localStorage.getItem("mytime");
      ///  const _id = localStorage.getItem('_id');
      //  this.saveDataInLocalStorage()

           
        let authData : AuthData = {_id:"",email:email,password:password,firstName:"",lastName:"",phoneNumber:"",userName:"",googleId:"",imagePath:"",address:this.address,orderHistory:this.orderHistory,isActive:false,Cart:this.Cart,role:""};
        


        
        this.http.get<{user:AuthData}>("http://localhost:4500/user/info/" + email).subscribe(res=>{
          
            this.authData = res.user;
            console.log(this.authData);
            authData = this.authData;
            console.log("######################");
        });
        console.log(authData);
          //  console.log(this.authData);
          //  console.log(authData);
        this.http.post<{token:string,expiresIn:any,message:string,_id:string,userName:string,lastName:string,firstName:string,phoneNumber:string,isActive:boolean}>("http://localhost:4500/user/login",authData).subscribe(res=>{
              console.log(res.token);
              const token = res.token;
              //const isActive = res.
              console.log(res.firstName);
              this.token = token;
              this.errorMessage = res.message;
              
              if(this.errorMessage){
                this.checkError(this.errorMessage);
              }
              alert(res.isActive);
             
              if(res.isActive===true){
                  alert("you are active welcome");
              }else{
                alert("not active,please confirm your mail");
                this.router.navigate(['/login']);
              }
              
              if(token){
                  const expiresDuration:any = res.expiresIn;
                this.setOfTimer(expiresDuration);
                
                this.isAuthenticated = true;
                this.authStatusListner.next(true);
                const now = new Date();
                const exDate = new Date(now.getTime() + expiresDuration*1000);
                this.saveAuthData(token,exDate,email);
                this.saveId(res._id);
                this.saveDataInLocalStorage(email,res.firstName,res.lastName,res.phoneNumber,res.userName);
                console.log(exDate);
                this.router.navigate(['/profile/' + res._id]);
              //  window.location.reload();
              }
              
          });
    }

    logInWithGoogle(){
     // if(this.loggedIn()){
        location.href = "http://localhost:4500/user/login/google";
    //  }
     
    //  this.http.get("http://localhost:4500/user/login/google");
    }


    facebookLogIn(){
      alert("face");
      location.href = "http://localhost:4500/user/login/facebook";
    }

    public setToken(token:string){
      localStorage.setItem('token',token);
    }
    public saveAuthData(token:string,expirationDate:Date,email:string){
        localStorage.setItem('token',token);
        localStorage.setItem('email',email);
        localStorage.setItem('expiration',expirationDate.toISOString());
        // localStorage.setItem('firstName',firstName);
        // localStorage.setItem('lastName',lastName);
        // localStorage.setItem('phoneNumber',phoneNumber);
        // localStorage.setItem('userName',userName);
    }
    public saveId(_id:string){
        localStorage.setItem('_id',_id);
    }
    public saveEmailToken(emailToken:string){
      localStorage.setItem('emailToken',emailToken);
  }
  public saveDataInLocalStorage(email:string,firstName:string,lastName:string,phoneNumber:string,userName:string){
        //localStorage.setItem('token',token);
        
        localStorage.setItem('email',email);
        localStorage.setItem('firstName',firstName);
        localStorage.setItem('lastName',lastName);
        localStorage.setItem('phoneNumber',phoneNumber);
        localStorage.setItem('userName',userName);
        
        
    }

    public clearOfData(){
        localStorage.removeItem("token");
        localStorage.removeItem("expiration");
        localStorage.removeItem("email");
        localStorage.removeItem("userName");
        localStorage.removeItem("firstName");
        localStorage.removeItem("lastName");
        localStorage.removeItem("_id");
        localStorage.removeItem("phoneNumber");
    }

     authAuthUser()
    {             
        const authInfo = this.getAuthData();
        if(!authInfo){
            return;
        }
        const now = new Date();
        const expiresIn = authInfo.expirationDate.getTime() - now.getTime();
        if(expiresIn>0){
            this.token = authInfo.token;
            this.isAuthenticated = true;
            this.setOfTimer(expiresIn/1000);
            this.authStatusListner.next(true);
        }   
    }

    public getAuthData(){
        const token = localStorage.getItem("token");
        const expirationDate = localStorage.getItem("expiration");
        if(!token || !expirationDate){
            return ;
        }
        return {
            token:token,
            expirationDate : new Date(expirationDate)
        }
    }

     getAuthDataFromLocalStorage(){
        const token = localStorage.getItem("token");
       return token;
    }
    getEmailFromLocalStorage(){
        const email = localStorage.getItem("email");
       return email;
    }
    getUserNameFromLocalStorage(){
        const userName = localStorage.getItem("userName");
       return userName;
    }
    getFirstNameFromLocalStorage(){
        const firstName = localStorage.getItem("firstName");
       return firstName;
    }

    public setOfTimer(duration:number){
        console.log("Setting timer :" + duration);
        this.tokenTimer = setTimeout(()=>{
            this.LogOut();
           }, duration * 1000);
    }

    loggedIn(){
        return  !!localStorage.getItem("token");
    }


    getUserByToken(token){
        const user = { token:token};
          this.http.post<{user:any}>("http://localhost:4500/user/" +  token,user).subscribe(res=>{
              console.log(res.user);
              
             // const token = res.token;
             
            //   this.token = token;
            //   if(token){
            //       const expiresDuration:any = res.expiresIn;
            //     this.setOfTimer(expiresDuration);
                
            //     this.isAuthenticated = true;
            //     this.authStatusListner.next(true);
            //     const now = new Date();
            //     const exDate = new Date(now.getTime() + expiresDuration*1000);
            //     this.saveAuthData(token,exDate);
            //     console.log(exDate);
            //    this.router.navigate(["/home"]);
            //   }
              
          });
    }
    getUserById(_id:string){

        return this.http.get<{user:AuthData}>('http://localhost:4500/user/' +_id);
    }
    
    updateUser(_id:string,firstName:string, lastName:string, phoneNumber:string,
        userName:string, password:string, email:string,role:string){
           
            // const userData = new FormData();
            // // userData.append("_id",null);
            //  userData.append("firstName",firstName);
            //  userData.append("lastName",lastName);
            //  // gpuData.append("imgPath",imgPath);
            //  userData.append("phoneNumber",phoneNumber);
            //  userData.append("userName",userName);
            //  userData.append("password",password);
            //  userData.append("email",email);
            const googleId = "";
            const imagePath = "";
             const  userData : AuthData= {
               _id:_id,
               firstName:firstName,
               lastName:lastName,
               phoneNumber:phoneNumber,
               userName:userName,
               password:password,
               email:email,
               role:role,
               googleId:googleId,
               imagePath:imagePath,
               Cart:null,
               address:null,
               isActive:null,
               orderHistory:null
              };
     
            
           //  const gpu: Gpu = {name:name,_id:_id,price:price,company:company,imgPathCompanyLogo:imgPathCompanyLogo,imgPath:imgPath,description:description,numOfStars:numOfStars};
            this.http.put('http://localhost:4500/user/'+_id,userData).subscribe(res=>{
             const updateUsers = [...this.users];
             const oldGpuInd = updateUsers.findIndex(p=>p._id===_id);
             const user : AuthData = {email:email,firstName:firstName,_id:_id,lastName:lastName,phoneNumber:phoneNumber,userName:userName,password:password,googleId:"",imagePath:"",Cart:null,isActive:false,orderHistory:null,address:null,role:role};
             updateUsers[oldGpuInd]=user;
             this.users = updateUsers;
             this.UsersUpdated.next([...this.users]);
             //this.router.navigate(["/users"]);
            });
          
            this.router.navigate(['/users']);
    }

    deleteUserById(_id:string){
        this.http.delete('http://localhost:4500/user/'+_id).subscribe(()=>{
            const updatedUsers = this.users.filter(gpu=>gpu._id!==_id);
             this.users = updatedUsers;
             this.UsersUpdated.next([...this.users]);
    });


    }
    getUserUpdateListner(){
        return this.UsersUpdated.asObservable();
      }
      getUserListner(){
        return this.user.asObservable();
      }
      
      checkError(error:string){
        if(error!==""){
            alert(error);
        //  console.log();
        this.dialog.open(DialogMessageComponent,{
            data:error
        });
         // this.router.navigate["/login"];
         // location.reload() ;
            //return;
        }
    }

      getUsers(){
       
            //this.http.get<{gpus: Gpu[]}>('http://localhost:4500/gpu').subscribe((gpuData)=>{
    this.http.get<{users: any }>('http://localhost:4500/user'
    ).pipe(
        
        map((userData)=>{
    
    // console.log(gpuData.gpus);
   return userData.users.map(user=>{
    return {
      firstName:user.firstName,
      lastName:user.lastName,   
      phoneNumber:user.phoneNumber,
      password:user.password,
      email:user.email,
      userName:user.userName,
      _id:user._id,
      googleId:user.googleId,
      imagePath:user.imagePath,
      Cart:user.Cart,
      orderHistory:user.orderHistory,
       isActive:false,
       

      
      

    };
   });
    }))
    .subscribe((users)=>{
        
     this.users = users;
      // console.log(gpus);
       this.UsersUpdated.next([...this.users]);
    });
    return this.users;
      }

    //  
 
      getUserId(){
   
        // const decode = require('jwt-decode');
       // req.params.headers.authorization =  'eyJhbGciOiJIUzI1NiIsInR5cCI6ImFjY2VzcyIsInR5cGUiOiJhY2Nlc3MifQ.eyJ1c2VySWQiOjEsImFjY291bnRJZCI6MSwiaWF0IjoxNTA2MzMwNzIyLCJleHAiOjE1MDY0MTcxMjIsImF1ZCI6Imh0dHBzOi8veW91cmRvbWFpbi5jb20iLCJpc3MiOiJmZWF0aGVycyIsInN1YiI6ImFub255bW91cyJ9.gZrDJhmzdpt9-7OCeRcKiayQiKbtv-3UaTkN1BhOCAI'
       const token =this.getAuthDataFromLocalStorage();
        var userId =  jwt_decode(token).userId; 
        console.log(userId);
        return userId;
      }
      //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
       // Create an observable of Auth0 instance of client
  auth0Client$ = (from(
    createAuth0Client({
      domain: "dev-bvllc7ul.us.auth0.com",
      client_id: "If81RaJyrESQNwrChL926ahIdK1Eifjn",
      redirect_uri: `${window.location.origin}`
    })
  ) as Observable<Auth0Client>).pipe(
    shareReplay(1), // Every subscription receives the same shared value
    catchError(err => throwError(err))
  );
  // Define observables for SDK methods that return promises by default
  // For each Auth0 SDK method, first ensure the client instance is ready
  // concatMap: Using the client instance, call SDK method; SDK returns a promise
  // from: Convert that resulting promise into an observable
  isAuthenticated$ = this.auth0Client$.pipe(
    concatMap((client: Auth0Client) => from(client.isAuthenticated())),
    tap(res => this.loggedInn = res)
  );
  handleRedirectCallback$ = this.auth0Client$.pipe(
    concatMap((client: Auth0Client) => from(client.handleRedirectCallback()))
  );
  // Create subject and public observable of user profile data
  private userProfileSubject$ = new BehaviorSubject<any>(null);
  userProfile$ = this.userProfileSubject$.asObservable();
  // Create a local property for login status
  loggedInn: boolean = null;

  

  // When calling, options can be passed if desired
  // https://auth0.github.io/auth0-spa-js/classes/auth0client.html#getuser
  getUser$(options?): Observable<any> {
    return this.auth0Client$.pipe(
      concatMap((client: Auth0Client) => from(client.getUser(options))),
      tap(user => this.userProfileSubject$.next(user))
    );
  }

  private localAuthSetup() {
    // This should only be called on app initialization
    // Set up local authentication streams
    const checkAuth$ = this.isAuthenticated$.pipe(
      concatMap((loggedInn: boolean) => {
        if (loggedInn) {
          // If authenticated, get user and set in app
          // NOTE: you could pass options here if needed
          return this.getUser$();
        }
        // If not authenticated, return stream that emits 'false'
        return of(loggedInn);
      })
    );
    checkAuth$.subscribe();
  }

  // login(redirectPath: string = '/') {
  //   // A desired redirect path can be passed to login method
  //   // (e.g., from a route guard)
  //   // Ensure Auth0 client instance exists
  //   this.auth0Client$.subscribe((client: Auth0Client) => {
  //     // Call method to log in
  //     client.loginWithRedirect({
  //       redirect_uri: `${window.location.origin}`,
  //       appState: { target: redirectPath }
  //     });
  //   });
  // }

  // private handleAuthCallback() {
  //   // Call when app reloads after user logs in with Auth0
  //   const params = window.location.search;
  //   if (params.includes('code=') && params.includes('state=')) {
  //     let targetRoute: string; // Path to redirect to after login processsed
  //     const authComplete$ = this.handleRedirectCallback$.pipe(
  //       // Have client, now call method to handle auth callback redirect
  //       tap(cbRes => {
  //         // Get and set target redirect route from callback results
  //         targetRoute = cbRes.appState && cbRes.appState.target ? cbRes.appState.target : '/';
  //       }),
  //       concatMap(() => {
  //         // Redirect callback complete; get user and login status
  //         return combineLatest([
  //           this.getUser$(),
  //           this.isAuthenticated$
  //         ]);
  //       })
  //     );
  //     // Subscribe to authentication completion observable
  //     // Response will be an array of user and login status
  //     authComplete$.subscribe(([user, loggedInn]) => {
  //       // Redirect to target route after callback processing
  //       this.router.navigate([targetRoute]);
  //     });
  //   }
  // }

  // logout() {
  //   // Ensure Auth0 client instance exists
  //   this.auth0Client$.subscribe((client: Auth0Client) => {
  //     // Call method to log out
  //     client.logout({
  //       client_id: "If81RaJyrESQNwrChL926ahIdK1Eifjn",
  //       returnTo: `${window.location.origin}`
  //     });
  //   });
  // }



   getUserByGoogleId(googleID:string){
   return  this.http.get<{user:User}>("http://localhost:4500/user/info/google/" + googleID);
   }


   saveDetails(email:string){
    
      this.http.get<{authData:AuthData}>("http:localhost:4500/user/saveUserDetails/"+ email).subscribe(data=>{
        console.log(data.authData);
        


      })
       
    
     
    
    

  
   }

   getEmailByToken(){
    let token =this.getAuthDataFromLocalStorage();
    let email =  jwt_decode(token).email; 
    // let userId =  jwt_decode(token).userId; 
       return email;
   }
   getIdByToken(){
    let token =this.getAuthDataFromLocalStorage();
    let email =  jwt_decode(token).email; 
    // let userId =  jwt_decode(token).userId; 
       return email;
   }
   getUser(){
     let email = this.getEmailByToken();
     return this.http.get<{user:AuthData}>("http://localhost:4500/user/info/" + email);
    

   }
   
}