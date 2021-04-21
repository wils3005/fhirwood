# fhirwood

1. Create a simple web application (you can use whatever boilerplate you think best e.g. rails new)

2. Go to the sandbox site: http://hapi.fhir.org/, this is a test server from UHN to test out FHIR API calls (https://en.wikipedia.org/wiki/Fast_Healthcare_Interoperability_Resources ) – the latest interoperability standard to exchange health information. Note: we don't own this server but regularly use it to do FHIR testing. We regularly use FHIR calls to integrate with hospital electronic health records (e.g. get patient data). Please note we don't own this sandbox, the data is public, and also that other people will be interacting with it as well (e.g. other users might send test data in so your queries might not always return the same thing).

3. In your web application, build out methods to fetch a sample of patients from the FHIR server (https://hapi.fhir.org/resource?serverId=home_r4&pretty=false&_summary=&resource=Patient ). There should be documentation on how to properly construct the query. Please fetch all available patients that are born after 1950.

4. Once you are able to fetch the patient data, examine the JSON returned to get familiar with the schema.

5. Create views (Html) that will show basic statistics from the data you retrieved including:

- Number of patients
- Average age
- Number of pediatric patients (less than 18)

6. Create a simple visualization to graph the age of patients as a histogram. You can use any library you are familiar with (e.g. google charts, chartjs).

7. Create a simple table to lists out all patients in your dataset (columns can be name, birthdate, and any other relevant information you feel appropriate). Include a simple filter for this table to show only pediatric cases (patients less than age 18).

8. Extra: some considerations for you to make include what happens if the dataset is over 100,000+ patients – how do you manage load performance. How about if we needed to store the data but also secure/encrypt it? (You don't need to code these, but be prepared to discuss strategies).
