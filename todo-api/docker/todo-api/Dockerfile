#optimized Java 9 JRE with the spring boot Todo API
#based on the example at https://blog.jdriven.com/2017/11/modular-java-9-runtime-docker-alpine/

# First stage: Runs JLink to create the custom JRE
FROM alpine:3.6 AS builder

ENV JAVA_HOME=/opt/jdk \
    PATH=${PATH}:/opt/jdk/bin \
    LANG=C.UTF-8

RUN set -ex && \
    apk add --no-cache bash && \
    wget http://download.java.net/java/jdk9-alpine/archive/181/binaries/jdk-9-ea+181_linux-x64-musl_bin.tar.gz -O jdk.tar.gz && \
    mkdir -p /opt/jdk && \
    tar zxvf jdk.tar.gz -C /opt/jdk --strip-components=1 && \
    rm jdk.tar.gz && \
    rm /opt/jdk/lib/src.zip

WORKDIR /app

COPY backend-module/target/backend-module-1.0-SNAPSHOT.jar .
COPY frontend-module/target/frontend-module-1.0-SNAPSHOT.jar .

RUN jlink --module-path backend-module-1.0-SNAPSHOT.jar:frontend-module-1.0-SNAPSHOT.jar:$JAVA_HOME/jmods \
        --add-modules com.jdriven.java9runtime.frontend \
        --launcher run=com.jdriven.java9runtime.frontend/com.jdriven.java9runtime.frontend.FrontendApplication \
        --output dist \
        --compress 2 \
        --strip-debug \
        --no-header-files \
        --no-man-pages

#2nd stage is results in the final image
FROM alpine:3.6

WORKDIR /app

COPY --from=builder /app/dist/ ./

ENTRYPOINT ["bin/run"]