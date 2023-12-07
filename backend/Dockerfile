FROM amazoncorretto:17.0.7-alpine
#RUN mvn clean install -DskipTests
ARG JAR_FILE=target/*.jar
COPY ./target/car-trader-aws-api-exe.jar app.jar
ENTRYPOINT [ "java", "-jar", "/app.jar" ]