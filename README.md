# WebART
A web interface for ART

## Requirements 
- Java 15+ [Download](https://www.oracle.com/uk/java/technologies/downloads/)
- Maven 3+ [Download](https://maven.apache.org/download.cgi)

## art.jar
For WebART to be able to run ART, the jar file for WebART needs to be in the same directory as art.jar.

## Running WebART
WebART is run using Maven's exec plugin:
```
mvn exec:java
```

When `Server successfully started` is outputted in the console, then the server is running and WebART can be accessed at `localhost:2999`.