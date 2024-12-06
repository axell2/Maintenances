FROM ruby:3.2.2

RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential git libpq-dev libvips pkg-config nodejs


WORKDIR /app
RUN gem install bundler
COPY Gemfile Gemfile.lock ./
RUN bundle install
COPY . ./ 

ENTRYPOINT ["./bin/docker-entrypoint.sh"]
