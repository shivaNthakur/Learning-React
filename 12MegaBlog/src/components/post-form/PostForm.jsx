import React, {useCallback } from 'react'; //useCallback: Hook that memoizes a function so it doesn’t get recreated on every render.

// Use Case: Improves performance when passing functions to children or inside useEffect.
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import appwriteService from "../../appwrite/config";
import { Button, Input, RTE, Select } from "..";


export default function PostForm({ post }) {
    const {register, handleSubmit, watch, setValue, control, getValues} = useForm({
        defaultValues: {
            title: post?.title || '',
            slug: post?.$id || '',
            content: post?.content || '',
            status: post?.status || 'active'
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const submit = async (data) => {
        if(post) { // we are updating , if Post already exist.

// 	•	If a new image is selected (data.image[0]), it uploads the image using appwriteService.uploadFile.
		
 // • If no image is selected, file will be null.

            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

// 	•	If a new image was uploaded (file is truthy), delete the previous featured image from storage to avoid unused storage usage.

            if(file) {
                appwriteService.deleteFile(post.featuredImage);
            }

// 	•	updatePost is called to update the post content.
//	•	Spread operator ...data includes all updated form values.
//	•	featuredImage is updated only if a new file was uploaded.
//	•	If not, undefined keeps the old image intact.

            const dbPost = await appwriteService.updatePost(post.$id, {
                ...data, 
                featuredImage: file ? file.$id :
                undefined,
            });

// 	•	If the post was updated successfully, redirect the user to the post’s page using navigate() from React Router.

            if(dbPost) {
                navigate(`/post/${dbPost.$id}`)
            }
        } else { // 	•	If post is falsy, this is a new post submission.

            const file = await appwriteService.uploadFile(data.image[0]);

// 	•	Saves the uploaded file’s ID (file.$id) into data.featuredImage.

            if(file) {
                const fileId = file.$id;
                data.featuredImage = fileId;

// 	•	Creates the post using form data and the logged-in user’s ID (userData.$id).

                const dbPost = await appwriteService.createPost({ ...data, userId: userData.$id
                });

// 	•	After successful creation, redirect the user to the new post page.

                if(dbPost) {
                    navigate(`/post/${dbPost.$id}`)
                }
            }
        }
        
    };

    const slugTransform = useCallback((value) => {
        if(value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");
    }, []);

    React.useEffect(() => {
        const subscription = watch((value,{ name }) => {
            console.log("Changed field:", info.name);
  console.log("Full form state:", value,'/n');
            if(name === "title") {
                setValue('slug', slugTransform(value.title), { shouldValidate: true});
            }
            console.log("Changed field:", info.name);
  console.log("Full form state:", value);

        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);


    return (
        <form onSubmit={handleSubmit(submit)} className='flex flex-wrap'>
            <div className='w-2/3 px-2'>
                <Input 
                    label = "Title :"
                    placeholder= "Title"
                    className= "mb-4"
                    {...register("title", { required:true})}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}










/*
*### Deep Explanation of `PostForm.jsx` in React with Appwrite, Tailwind, and React Hook Form

---

## 🔧 Imports Breakdown

```js
import React, { useCallback } from 'react';
```

* **React**: Main library to build UI components.
* **useCallback**: Hook that memoizes a function so it doesn’t get recreated on every render.

  * **Use Case**: Improves performance when passing functions to children or inside useEffect.

```js
import { useForm } from 'react-hook-form';
```

* **useForm**: Hook for managing form state.

  * Gives methods like `register`, `handleSubmit`, `setValue`, `watch`, etc.
  * Efficient and performant alternative to Formik or uncontrolled forms.

```js
import { useSelector } from 'react-redux';
```

* **useSelector**: Access Redux store.

  * `state => state.auth.userData` gets current logged-in user info.

```js
import { useNavigate } from 'react-router-dom';
```

* **useNavigate**: Programmatically redirect users after form submission.

```js
import appwriteService from "../../appwrite/config";
```

* Custom module that wraps Appwrite SDK methods like:

  * uploadFile
  * deleteFile
  * updatePost
  * createPost
  * getFilePreview

```js
import { Button, Input, RTE, Select } from "..";
```

* Custom UI components like `Input`, `Select`, `RTE` (Rich Text Editor).

---

## 🧠 Component: `PostForm`

```js
export default function PostForm({ post }) {
```

* Accepts `post` prop:

  * If `post` exists: form is in "Edit mode".
  * If not: form is in "Create mode".

## 📦 useForm Setup

```js
const {register, handleSubmit, watch, setValue, control, getValues} = useForm({
  defaultValues: { title, slug, content, status }
});
```

* **register**: Connects input field to form state.
* **handleSubmit**: Handles submission.
* **watch**: Watches form values live.
* **setValue**: Programmatically change field value.
* **control**: Used with `Controller` components (like RTE).
* **getValues**: Retrieve current value of a field.

---

## 🔀 Navigation & Redux

```js
const navigate = useNavigate();
const userData = useSelector((state) => state.auth.userData);
```

* `navigate`: Used to redirect user to `/post/{id}`.
* `userData`: Used to attach `userId` while creating a post.

---

## 🔄 Submit Logic

```js
const submit = async (data) => {
```

* Triggered when user submits the form.
* `data` contains values from form fields.

### 📝 If Updating Existing Post

```js
if (post) {
  const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;
  if(file) appwriteService.deleteFile(post.featuredImage);
```

* Upload new image if selected
* Delete old image if new one exists

```js
const dbPost = await appwriteService.updatePost(post.$id, {...data, featuredImage: file ? file.$id : undefined});
```

* Send updated values and new image id

```js
if(dbPost) navigate(`/post/${dbPost.$id}`);
```

* Redirect user to post page

### 🆕 If Creating New Post

```js
const file = await appwriteService.uploadFile(data.image[0]);
```

* Upload new image and get file ID

```js
data.featuredImage = file.$id;
```

* Store file ID in form data

```js
const dbPost = await appwriteService.createPost({ ...data, userId: userData.$id });
```

* Create post with data + user id

```js
if(dbPost) navigate(`/post/${dbPost.$id}`);
```

* Redirect to new post

---

## 🔡 Slug Transformation

```js
const slugTransform = useCallback((value) => {
```

* `useCallback`: Prevents re-creation on every render.
* Removes special characters, converts to lowercase, replaces spaces with `-`

```js
React.useEffect(() => {
```

* Watches `title` field using `watch`
* Auto-generates slug and sets it using `setValue`

---

## 🖼️ Form UI Structure

```jsx
<form onSubmit={handleSubmit(submit)} className='flex flex-wrap'>
```

* 2 columns:

  * Left: Title, Slug, Content
  * Right: Image Upload, Status, Submit Button

### Left Column:

```js
<Input {...register("title", { required: true })} />
```

* Connected to form using `register`

```js
<RTE name="content" control={control} defaultValue={getValues("content")} />
```

* Rich Text Editor controlled using `control`

### Right Column:

```js
<Input type="file" {...register("image", { required: !post })} />
```

* Required only in create mode

```js
{post && <img src={appwriteService.getFilePreview(post.featuredImage)} />}
```

* Preview old image in edit mode

```js
<Select options={["active", "inactive"]} {...register("status")} />
<Button type="submit">Submit</Button>
```

---

## 💬 Interview-Level Q\&A

**Q1: Why use ****`useCallback`****?**

> To memoize `slugTransform` so it doesn’t get recreated unless dependencies change.

**Q2: What happens if we don’t use ****`control`**** for RTE?**

> RTE won’t connect to form state, and its value won’t be captured on submit.

**Q3: Can this form be used without Redux?**

> Yes, but you’ll need another way to get `userId` (e.g., context).

**Q4: Why handle image delete on update?**

> To avoid keeping unused files in Appwrite storage.

**Q5: What will happen if slug field is not updated manually?**

> It will auto-update when title is typed.

---

## ✅ Possible Enhancements

1. **Form Validation UI** using errors from `useForm`
2. **Toast Notifications** on success/failure
3. **Loading Spinner** on submit
4. **Drag & Drop Image Upload**
5. **Draft Save Mode**

---

Let me know if you'd like this in markdown, PDF, or inside a real `.jsx` file with inline comments.
 
*/