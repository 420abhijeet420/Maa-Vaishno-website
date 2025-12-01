import { Inngest } from "inngest";
import User from "../models/User.js";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "my-react-app" });




// Inngest Function to save user data to a database
const syncUserCreation = inngest.createFunction(
  //Give it an ID
  { id: "sync-user-from-clerk" },

  //Tell Inngest: “Run this job when this event happens”
  { event: "clerk/user.created" },
  async ({ event }) => {

    //Extract the user info
    const { id, first_name, last_name, email_addresses, image_url } = event.data;

    //Prepare the user object for the database
    const userData = {
      _id: id,
      email: email_addresses[0].email_address,
      name: first_name + " " + last_name,
      image: image_url
    };
    //Save the user to MongoDB
    await User.create(userData)
  }
);





// Ingest function to delete user
const syncUserDeletion = inngest.createFunction(
  { id: "delete-user-from-clerk" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    const {id} = event.data;
    await User.findByIdAndDelete(id);
  }
);




// Inngest Function to save update data to a database
const syncUserUpdation = inngest.createFunction(
  { id: "upadte-user-from-clerk" },   //Give it an ID
  { event: "clerk/user.updated" },  //Tell Inngest: “Run this job when this event happens”

  async ({ event }) => {

    const { id, first_name, last_name, email_addresses, image_url } = event.data;     //Extract the user info
    //Prepare the user object for the database
    const userData = {
      _id: id,
      email: email_addresses[0].email_address,
      name: first_name + " " + last_name,
      image: image_url
    };
    await User.findByIdAndUpdate(userData); //Save the user to MongoDB
  }
);



// Create an empty array where we'll export future Inngest functions
export const functions =[syncUserCreation,
                        syncUserDeletion, 
                        syncUserUpdation];
/*
Explanation of the Inngest Function:

This code creates a background job using Inngest. The job runs automatically whenever Clerk sends the event "clerk/user.created", which means a new user has signed up.

1. inngest.createFunction(...)
   This defines a new background job.

2. { id: "sync-user-from-clerk" }
   This is just the name of the job. Useful for logs and identifying the function (“Run this job when this event happens”).

3. { event: "clerk/user.created" }
   This tells Inngest to run this job whenever Clerk notifies that a new user account has been created.

4. async ({ event }) => { ... }
   This is the function that runs when the event happens. It receives the data sent by Clerk.

5. const { id, first_name, last_name, email_addresses, image_url } = event.data;
   This extracts (destructures) the user info from the event payload.

6. const userData = { ... }
   This prepares a user object to store in the database:
   - _id: user’s Clerk ID
   - email: primary email
   - name: first name + last name
   - image: profile picture URL

7. await User.create(userData);
   This saves the new user into the database. It happens in the background, so your app stays fast.

Summary:
This code listens for Clerk's "user created" event and automatically saves the new user's information into your database using a background job managed by Inngest.

*/