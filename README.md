### Project description:
Project gives a possibility to a user to calculate a diamond price based on Carat Weight, Cut, Color and Clarity, Make abd Certificate.
The project contains two exposed API endpoints `/diamond/calculate` and `/diamond/get-similar-products` endpoints that allows to calculate diamond price and to get up to 4 similar products.

Project utilizes third-party API endpoints.

### API endpoints
1. GET `/api/v1/calculate`. Request data format:
````
   cut: string;
   carat: number;
   color: string;
   clarity: string;
   make: string; (optional)
   certificate: string;  (optional)
   useOfflineCalculator: boolean; (optional)
````
2. GET `/get-similar-products`. Request data format:
````
  cut: string;
  budget: string;
````

### Dependencies
1. Third-party API endpoint to calculate diamond price `http://www.idexonline.com/DPService.asp`
2. Third-party API endpoint to fetch similar diamonds `https://www.diamonds.pro/goodai-dist/goodai/server/api-staging.php`

### Project set up assumptions:
1. Nest.js is used for the project architecture
2. Typescript is used by default
3. Cache manager is used to cache data by default for 15 minutes
4. Basic unit tests were added
5. Error, warn, info logs were added to the terminal

### Behaviour assumptions:
1. Required diamond characteristics to calculate price were provided: Carat Weight, Cut, Color and Clarity.
2. Optional diamond characteristics to calculate price were added: Make abd Certificate.
3. Third party API is used in order to calculate diamond price:
   `http://www.idexonline.com/DPService.asp`
4. Characteristics options were taken from the source (Input parameters):
   `http://www.idexonline.com/DPService.asp`
5. Added possibility to calculate price offline in case "useOfflineCalculator=true" was provided while calling calculate diamond price endpoint
FYI: price formula was built based on mock values and do not reflect the real diamond price.
6. Since third-party api uses only specific cut to return similar products
(round, cushion, princess), a decision was made to accept mentioned values as dynamic and in case the value is different -
the first option (round) is used as a param to fetch similar products. 
Another required values were passed as fallback values (solitaire setting and white gold or platinum metal). 
7. Memory cache is used to save calculated price by default for 15 minutes. (Could be also redis)
8. Basic unit tests were added to test project functionality
9. Max product length = 4 was added while fetching similar products according to the requirements
10. Basic request data validations were added for both endpoints


### Run project

1. Install dependencies 
```bash
$ yarn install
```
2. Copy/paste `.env.example` and rename to `.env` in order to have environment variables during project running. Update variables in case of need.
3. In the project directory, you can run:
```bash
$ yarn start
```


## Test

```bash
# unit tests
$ yarn run test
```
