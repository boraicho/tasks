namespace UsersAndAwards.Entities
{
    using _EPAM_UsersAndAwards.Entities;
    public class AwardDTO
    {
        public AwardDTO(){}
        public AwardDTO(int id, string title, string description, ImageDTO image)
        {
            Id = id;
            Title = title;
            Description = description;
            Image = image;

        }

        private int id;
        private string title;
        private string desription;
        private ImageDTO image;

        public ImageDTO Image
        {
            get {return image;}
            set {image = value;}
        }
        public string Description
        {
            get { return desription; }
            set { desription = value; }
        }


        public string Title
        {
            get { return title; }
            set { if(!string.IsNullOrWhiteSpace(value)) title = value; }
        }

        public int Id
        {
            get { return id; }
            set { id = value; }
        }

    }
}