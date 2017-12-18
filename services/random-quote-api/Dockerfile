FROM scratch
#required for TLS
ADD ca-certificates.crt /etc/ssl/certs/
ADD main /
ENV RANDOM_QUOTE_SERVICE "quotes.rest"
CMD ["/main"]