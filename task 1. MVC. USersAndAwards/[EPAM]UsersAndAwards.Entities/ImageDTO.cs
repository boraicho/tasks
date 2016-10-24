namespace _EPAM_UsersAndAwards.Entities
{
    using System;


    public class ImageDTO
    {
        private byte[] image;
        private string namePhoto;
        public string ContentType { get; set; }
        public string NamePhoto
        {
            get { return namePhoto; }
            set
            {
                    namePhoto = value;
            }
        }

        public byte[] Image
        {
            get { return image; }
            set { image = value; }
        }

        public ImageDTO(byte[] image, string namePhoto, string contentType)
        {
            Image = image;
            NamePhoto = namePhoto;
            ContentType = contentType;
        }

    }
}
