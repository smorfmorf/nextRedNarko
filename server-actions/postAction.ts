"use server";

// это как в php просто можем получить данные от формы $username = $_POST['username'];
export async function postAction(formData: FormData) {
  const res = formData.get("username");
  console.log(`postAction: ${res}`);
}
