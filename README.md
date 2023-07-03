# WebART
A web interface for ART


## Requirements 
- Java 15+ [Download](https://www.oracle.com/uk/java/technologies/downloads/)
- Maven 3+ [Download](https://maven.apache.org/download.cg).

## Running WebART
WebART is run using Maven's exec plugin:
```
mvn exec:java
```

## Install art.jar to local Maven Repository
To install the art.jar file from `/lib` to the local maven repository, run:
```
mvn install:install-file -Dfile=lib/art.jar -DgroupId=uk.ac.rhul.cs.csle -DartifactId=art -Dversion=1.0 -Dpackaging=jar
```