const loadLessons = () => {
  const url = "https://openapi.programming-hero.com/api/levels/all";
  fetch(url) // promise of reponse
    .then((res) => res.json()) //promise of json data
    .then((json) => displayLesson(json.data));
};

const loadlevelword = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayLevelWord(data.data));
};

const displayLevelWord = (words) => {
  //get the container and empty
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";

//   {
// "id": 4,
// "level": 5,
// "word": "Diligent",
// "meaning": "পরিশ্রমী",
// "pronunciation": "ডিলিজেন্ট"
// }

  //   get every lesson array
  words.forEach((word) => {
    // create element
    const card = document.createElement("div");
    card.innerHTML = `
        <div class="bg-white rounded-xl shadow-sm text-center py-17 px-5 space-y-4">
          <h2 class="font-bold text-2xl">${word.word}</h2>
          <p class="font-semibold ">Meaning /Pronounciation</p>
          <div class="text-2xl font-medium font-bangla">${word.meaning} / ${word.pronunciation}</div>
          <div class="flex justify-between items-center ">
            <button class="bg-[#1A91FF10] p-3 hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info text-xl"></i></button>
            <button class="bg-[#1A91FF10] p-3 hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high text-xl"></i></button>
          </div>
         </div> 
        `;

    // append child
    wordContainer.append(card);
  });
};

const displayLesson = (lessons) => {
  // 1. get the container and empty
  const levelContainer = document.getElementById("lavel-container");
  levelContainer.innerHTML = "";

  // 2. get every lessons array
  lessons.forEach((lesson) => {
    // console.log(lesson);
    // 3. create Element
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
           <button onclick ='loadlevelword(${lesson.level_no})' class="btn btn-outline btn-primary">
           <i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}
           </button>
        `;

    // 4.append child
    levelContainer.append(btnDiv);
  });
};

loadLessons();
