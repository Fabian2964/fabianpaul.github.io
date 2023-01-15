class destination {
    constructor(
        id,
        continent,
        country,
        city,
        start_month,
        end_month,
        year,
        title,
        description,
        travel_partners,
        lat,
        long,
        images,
        link
    ) {
        this.id = id;
        this.continent = continent;
        this.country = country;
        this.city = city,
        this.start_month = start_month,
        this.end_month = end_month,
        this.year = year,
        this.title = title,
        this.description = description,
        this.tavel_partners = travel_partners,
        this.lat = lat,
        this.long = long,
        this.images = images,
        this.link = link
    }
}

export default destination;