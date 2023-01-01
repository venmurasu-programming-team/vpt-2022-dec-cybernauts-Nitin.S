let input = document.getElementById("inp");
let output = document.getElementById("out");
let container_result = document.getElementById("container_result");
function fetchbooks() {
    remove_previous_result();
  console.log("clicked");
  fetch(`http://openlibrary.org/search.json?q=${input.value}`)
    .then((a) => a.json())
    .then((response) => {
      for (let i = 0; i<(response.docs.length)-1; i++) {
        console.log(response);
        a = response;
        if(('author_name' in response.docs[i]) && ('title' in response.docs[i]) && ('isbn' in response.docs[i]) )
        {
            createbook(i, response);
        }
        
      }
    });
}

function createbook(i, response) {
  let div = document.createElement("div");
  div.setAttribute("class", "a_book");
  div.setAttribute("id", `i-${i}`);
  container_result.appendChild(div);
  let img = document.createElement("img");
  img.setAttribute("id", "cover_img");
  let title = document.createElement("h5");
  title.setAttribute("id", "title");
  let author = document.createElement("h5");
  author.setAttribute("id", "author");
  let view = document.createElement("div");
  view.setAttribute("id", "view_more");
  view.innerText='view more';
  let d = fetch(
    `http://covers.openlibrary.org/b/isbn/${response.docs[i].isbn[0]}-M.jpg`
  );
  d.then((res) =>
  { if(res.status!=200)
    {
        img.src = `images/no_cover.jpg`;
    }
    else {
        img.src = `http://covers.openlibrary.org/b/isbn/${response.docs[i].isbn[0]}-M.jpg`;
      }});
  title.innerHTML = `<span>title:</span>${response.docs[i].title}`;
  author.innerHTML = `<span>Author:</span>${response.docs[i]?.author_name[0]}`;
  div.append(img);
  div.append(title);
  div.append(author);
  div.append(view);
}
function remove_previous_result()
{while(container_result.firstChild)
{
    container_result.removeChild(container_result.firstChild);
}
}