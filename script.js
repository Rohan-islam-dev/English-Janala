const createElement = (arry) => {
  const htmlElement = arry.map((el) => `<span class="btn">${el}</span>`);
  return htmlElement.join(" ");
};

const manageSpinner = (status) => {
  if (status == true) {
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("word-container").classList.add("hidden");
  } else {
    document.getElementById("word-container").classList.remove("hidden");
    document.getElementById("spinner").classList.add("hidden");
  }
};

const loadLessons = () => {
  const url = "https://openapi.programming-hero.com/api/levels/all";
  fetch(url) // promise of reponse
    .then((res) => res.json()) //promise of json data
    .then((json) => displayLesson(json.data));
};

const removeActive = () => {
  const lessonButtons = document.querySelectorAll(".lesson-btn");
  lessonButtons.forEach((btn) => btn.classList.remove("active"));
};

const loadlevelword = (id) => {
  manageSpinner(true);
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      removeActive(); // remove all active class
      const clickbtn = document.getElementById(`lesson-btn-${id}`);

      clickbtn.classList.add("active"); //add active class
      displayLevelWord(data.data);
    });
};

const loadWordDetail = async (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  // console.log(url);
  const res = await fetch(url);
  const datails = await res.json();
  displayWordDeteils(datails.data);
};
// {
//     "word": "Eager",
//     "meaning": "আগ্রহী",
//     "pronunciation": "ইগার",
//     "level": 1,
//     "sentence": "The kids were eager to open their gifts.",
//     "points": 1,
//     "partsOfSpeech": "adjective",
//     "synonyms": [
//         "enthusiastic",
//         "excited",
//         "keen"
//     ],
//     "id": 5
// }

const displayWordDeteils = (word) => {
  console.log(word);
  const detailBox = document.getElementById("details-container");
  detailBox.innerHTML = `
  <div class="">
              <h2 class="text-2xl font-bold">${
                word.word
              } ( <i class="fa-solid fa-microphone-lines"></i>   :${
    word.pronunciation
  })</h2>
            </div>
            <div class="">
              <h2 class="font-bold">Meaning</h2>
              <p>${word.meaning}</p>
            </div>
            <div class="">
              <h2 class="font-bold">Example</h2>
              <p>${word.sentence}</p>
            </div>
            <div class="">
              <h2 class="font-bold">Synonym</h2>
              <div class="">${createElement(word.synonyms)}</div>
            </div>
  `;
  document.getElementById("word_modal").showModal();
};

const displayLevelWord = (words) => {
  //get the container and empty
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";

  if (words.length == 0) {
    wordContainer.innerHTML = `
      <div class="text-center col-span-full rounded-xl py-10 space-y-6 font-bangla">
            <img class="mx-auto" src="./assets/alert-error.png" alt="">
            <p class="text-xl font-medium text-gray-400">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h2 class="font-bold text-4xl">নেক্সট Lesson এ যান</h2>
          </div>
      `;
      manageSpinner(false)
    return;
  }
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
          <h2 class="font-bold text-2xl">${
            word.word ? word.word : "শব্দ পাওয়া যাইনি"
          }</h2>
          <p class="font-semibold ">Meaning /Pronounciation</p>
          <div class="text-2xl font-medium font-bangla">${
            word.meaning ? word.meaning : "অর্থ পাওয়া যাইনি"
          } / ${
      word.pronunciation ? word.pronunciation : "pronunciation পাওয়া যাইনি"
    }</div>
          <div class="flex justify-between items-center ">
            <button onclick="loadWordDetail(${
              word.id
            })" class="bg-[#1A91FF10] p-3 hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info text-xl"></i></button>
            <button class="bg-[#1A91FF10] p-3 hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high text-xl"></i></button>
          </div>
         </div> 
        `;

    // append child
    wordContainer.append(card);
  });
  manageSpinner(false);
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
           <button id="lesson-btn-${lesson.level_no}" onclick ='loadlevelword(${lesson.level_no})' class="btn btn-outline btn-primary lesson-btn">
           <i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}
           </button>
        `;

    // 4.append child
    levelContainer.append(btnDiv);
  });
};

loadLessons();
