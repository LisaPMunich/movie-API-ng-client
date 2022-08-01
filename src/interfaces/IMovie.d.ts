
interface IMovie {
  "_id": string
  "Title": string;
  "Description": string;
  "Genre": IGenre;
  "Director": IDirector;
  "ImageURL": string;
  "Featured": true;
}

interface IDirector {
  "Name": string;
  "Bio": string;
  "Birth"?: string;
  "Death"?: string;
}

interface IGenre {
  "Name": string;
  "Description": string;
}
