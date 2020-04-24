FROM buildkite/puppeteer
COPY . /app
WORKDIR /app
RUN npm install
CMD npm start