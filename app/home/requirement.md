### UI/UX - Setting
This block on the page, will have certain Predefined Filters, by clicking on which, the consumer would be redirected to a page where listings sponsored for that particular filter would be shown.
1. The predefined 5 filters are :
  * Rehabs on the Ocean
  * Mountain Lodge Recovery Centers
  * Wilderness Camps
  * Lake Front Addiction Centers
  * Residential Addiction Rehabs
2. Whenever an user would click on any of the above mentioned links, they would be taken to the respective page for the predefined filter.
3. Each of the page would be structured in the same exact manner as follows :
  * First Custom Heading
  * Custom Content section just under the First Custom Heading
  * A section that will give us a list of Rolling Listing tiles.
    + The listing show in this section would have payed to be listed under this sponsored listing filter.
    + If there are more than 6 sponsored listings for this particular page, then any 6 of them would be shown in a round robin manner.
    + On clicking on any of the listings, the user would be automatically redirected to the website of that listing.
  * Second Custom Heading
  * Custom Content section just under the Second Custom Heading

### API Protocol - Sponsored Listings
#### URL `/sponserd_listings`
#### Request type `POST`
#### Headers
```
{
  "Content-type": "application/JSON"
}
```

#### Request JSON
```
{
  "sponsored_listing_type" : "Executive Treatment"
}
```
#### Response JSON

```
{
  heading_1: "test",
  content_1: "test",
  heading_2: "test",
  content_2: "test",
  listings: [{
    id: 1,
    center_name: "test",
    description: "test",
    center_web_link: "test",
    listing_image: "test"
  }, {
    id: 2,
    ...
  }]
}
```
