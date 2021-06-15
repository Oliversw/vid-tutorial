# Tech Test OliverSW

## View the project on Netlify

- [Deployed version of the app](https://eloquent-lovelace-120bcb.netlify.app/)

Please note that there seem to be some issues with CSS on the deployed version but since this was not the focus of this exercise I left it as it was.

## Run the project locally

1. Download the repository to your local machine
2. Run `npm i` within the repository
3. Run `npm run dev` to create a development version that can be accessed locally
4. Alternatively you can run `npm run build` followed by `npm run preview` to view a production-like version of the build.

## Stack and technology choices

- This project was scaffolded using [Vite](https://vitejs.dev/) as a lightweight alternative to Create React App, better suited to small projects such as this. If it was intended for actual use or production I would likely have used CRA since it is more tested.
- Similarly, I opted to use the fetch API rather than a module such as Axios for the sake of simplicity. I try to avoid adding unnecessary modules wherever possible, but in a production app I would likely use something like Axios for API calls.
- The CSS is very basic and contained in a single stylesheet. I wanted to include some styles but not to focus on them, so I kept them as minimal as possible.

## Assumptions

- I made some assumptions in my build that in other circumstances I would first try to confirm with a colleague, designer, or via user testing:
  - The users want to see some information up front, but not necessarily all of it - I included an initial display of data after the initial fetch request and limited it to 20 videos so it wouldn't be overwhelming.
  - The users will either search via a search term or by tag - I was concerned about the speed of filtering through the large list of videos, so I opted to only search through video titles and teacher names when it came to search terms.

## Known bugs and issues

- pressing `enter` does not begin a search when typing in the search bar
- Searching for specific terms does not handle variations of capitalization or punctuation

## Features that I would like to have implemented

- I would like to have made the rendered tags clickable, where it would then search the list for that tag
- The user might find some kind of autocomplete or tag suggestion useful in the tag search, since it is not necessarily obvious what tags they can search for
- Ultimately handling the returned data on the backend might be more efficient than doing all of the searching and filtering on the front end.
