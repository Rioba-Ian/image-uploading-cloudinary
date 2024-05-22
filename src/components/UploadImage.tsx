export default function UploadImage() {
 const handleSubmit = async (e: Event) => {
  e.preventDefault();

  const fileInput = e.target?.elements.namedItem(
   "upload-file"
  ) as HTMLInputElement;

  const file = fileInput.files[0];

  console.log(file);

  const formData = new FormData();

  formData.append("file", file);

  try {
   const res = await fetch("http://localhost:8080/file", {
    method: "POST",
    body: formData,
   });

   if (!res.ok) {
    throw new Error(`HTTP error status:${res.status}`);
   }

   const data = await res.json();
   console.log(res);
   console.log(data);
  } catch (err) {
   console.error(err);
  }
 };

 return (
  <section class="">
   <form onSubmit={handleSubmit}>
    <fieldset>
     <label for="upload-file">Upload Image</label>
     <input type="file" name="upload-file" id="upload-file" />
    </fieldset>

    <button type="submit">Submit</button>
   </form>
  </section>
 );
}
