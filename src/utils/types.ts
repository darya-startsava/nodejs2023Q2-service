export type CreateUser = {
  login: string;
  password: string;
};

export type UpdatePassword = {
  oldPassword: string;
  newPassword: string;
};

export type CreateArtist = {
  name: string;
  grammy: boolean;
};

export type UpdateArtist = {
  name: string;
  grammy: boolean;
};

export type CreateAlbum = {
  name: string;
  year: number;
  artistId?: string | null;
};

export type UpdateAlbum = {
  name: string;
  year: number;
  artistId?: string | null;
};
