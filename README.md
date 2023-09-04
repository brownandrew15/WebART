# WebART
A web interface for ART

## Requirements 
- Java 15+ [Download](https://www.oracle.com/uk/java/technologies/downloads/)
- Maven 3+ [Download](https://maven.apache.org/download.cgi)

## Installing Dependencies
To install the dependencies run `mvn dependency:resolve` from the project root directory.

## art.jar
For WebART to be able to run ART, the jar file for WebART needs to be in the same directory as `art.jar`.

## Running WebART
WebART can run using Maven's exec plugin:
```
mvn exec:java
```

When `Server successfully started` is outputted in the console, then the server is running and WebART can be accessed at `localhost:2999`.

## Creating an Executable JAR
Run Maven's package command using `mvn package` to create the executable JAR file.
The jar file named `webart.jar` in the `target` directory. The other jar files, such as `webart-1.0.jar` that are generated do not contain all the dependencies needed to run WebART.

## Running on a different port
By defualt WebART uses port 2999, this can be changed by providing an argument to the `-p` flag such as `java -jar webart.jar -p 43125` to use 43125.