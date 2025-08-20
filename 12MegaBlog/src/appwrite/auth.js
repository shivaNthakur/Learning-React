// we are creating service to handle backend and just need to change liitle thing if we chnage backend service which are going to take in use.

// AuthService class to abstract Appwrite authentication logic for your frontend app. This approach is modular and scalable — ideal for decoupling backend service logic.

import conf from "../conf/conf.js";

import { Client , ID, Account} from "appwrite";

export class AuthService {
    client = new Client(); // Initializes Appwrite client.
    account; // Handles auth-related operations like login, register, logout, session, etc.


    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client); // it will create new account
    }

    async createAccount({email, password, name}) { // destructing 
        try {
            const userAccount = await this.account.create(ID.unique(),email, password, name);
            if (userAccount) {
                // call another method to directly login user
                return this.login({email,password})
            } else {
                return userAccount;
            }
        } catch (error) {
            throw error;
        }
    }


    async login ({email, password}) {
        try {
            return await this.account.createEmailPasswordSession(email, password)
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error ", error);
            
        }

        return null;
    }

    async logout () {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite service :: logout :: error ", error);
        }
    }

   /* async sendPasswordRecovery({email, redirectUrl}) {
        try {
            return await this.account.createRecovery(email, redirectUrl);
        } catch (error) {
            throw error;
        }
    }*/


}

const authService = new AuthService(); // we are doing it like this because we want to create user only when object is called.  

// 	•	Creates a singleton instance of AuthService, so it can be reused across your app (e.g., React components, Vue stores, etc.)


export  default authService



// add password recovery feature
// email verification

/* 🔁 Real World Analogy:

Think of client as a browser or Postman — it’s the tool making requests to the Appwrite backend.

But instead of typing URLs manually, you use Appwrite’s JavaScript methods like:
	•	account.create()
	•	account.createSession()
	•	account.get()

These methods use client internally to hit the actual API. 

🔧 Under the Hood:
	•	Client stores config like headers, project ID, and cookies
	•	Every request made using the account service (or databases, storage, etc.) uses this client instance to talk to the Appwrite backend


{createAccount({ email, password, name })
// This is called object destructuring in function parameters. Let’s break this down in simple terms.

It means:

“I expect an object with email, password, and name keys, and I want to extract them into variables right away.”


✅ Advantages
	1.	Clean code
No need to manually extract keys from the object.
	2.	Clearer intent
It’s obvious what properties are expected.
	3.	Order doesn’t matter
Unlike positional arguments, object destructuring lets you pass the values in any order.
	4.	Defaults possible
You can even assign default values like this:

function createAccount(user) {
  const email = user.email;
  const password = user.password;
  const name = user.name;
}

}
    💡 Interview-Level Concepts

Concept::
Explanation

Singleton Pattern:
Ensures only one instance of the service is used across the app.


Abstraction Layer:
This class hides Appwrite’s internal API from components.

Destructuring in Parameters:
Improves readability and ensures cleaner code.

Optional Chaining:
Use ?. to safely access nested objects (like req.files?.avatar).

Automatic Login After Signup:
Enhances user experience.

Fallback Return in Catch:
Graceful error handling by returning null or throwing.

Extendability:
You can add more services (reset, email verify) without rewriting logic.


*/
