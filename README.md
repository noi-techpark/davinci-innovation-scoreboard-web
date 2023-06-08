<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: CC0-1.0
-->

# Innovation Scoreboard

![REUSE Compliance](https://github.com/noi-techpark/davinci-innovation-scoreboard-web/actions/workflows/reuse.yml/badge.svg)

The innovation scoreboard is a project that aims to visualize the innovation data form South Tyrol and other Italien regions in a user friendly way.

This repository contains the source code for the innovation scoreboard frontend.

## Table of contents

- [Gettings started](#getting-started)
- [Running tests](#running-tests)
- [Deployment](#deployment)
- [Docker environment](#docker-environment)
- [Information](#information)

## Getting started

These instructions will get you a copy of the project up and running
on your local machine for development and testing purposes.

### Prerequisites

To build the project, the following prerequisites must be met:

- [Running authentication server](https://github.com/noi-techpark/authentication-server)
- Node 12 (and NPM)

If you don't want to install all prerequisites directly on your machine and instead use a Docker environment with all prerequisites already installed and configured, you can check out the [Docker environment](#docker-environment) section.

### How to setup NOI Authentication Server locally?

Skip this section if you connect to the NOI authentication test server.

- [Here](https://github.com/noi-techpark/authentication-server) you can find how to run the server locally
- Create a new realm following these [steps](https://github.com/noi-techpark/authentication-server/blob/master/docs/noi-authentication-server.md#realm)

#### How to register this application in your local authentication server?

1. Open the previously created realm
2. Create a new client (Clients -> Create)

| Property | Value                             |
| -------- | --------------------------------- |
| ClientID | davinci-innovation-scoreboard-web |

3. Client Settings

| Property    | Value  |
| ----------- | ------ |
| Access Type | public |
| Standard Flow Enabled | Off |
| Implicit Flow Enabled | On |
| Direct Access Grants Enabled | Off |
| Valid Redirect URIs | http://localhost:3000/callback |
| Web origins | http://localhost:3000 |

4. Navigate to Scope

| Property                                          | Value                                  |
| ------------------------------------------------- | -------------------------------------- |
| Full Scope Allowed                                | Off                                    |
| Client Roles -> davinci-innovation-scoreboard-api -> Assigned Roles | Move available roles to assigned roles |

#### How to create a user or assign a user the necessary roles for this application?

1. Go to users
2. Create user or select user (View users)
3. Assign roles: Role Mappings -> Client Roles -> davinci-innovation-scoreboard-api

### Source code

Get a copy of the repository:

```bash
git clone https://github.com/noi-techpark/davinci-innovation-scoreboard-web.git
```

Change directory:

```bash
cd davinci-innovation-scoreboard-web
```

### Configure

Set the following environment variables to configure the project:

- `API`: the URL of the API server

The defaults are already configured, that the you can use the Docker environment right away without any setup.

### Dependencies

Install all dependencies by executing the following command:

```bash
npm install
```

### Development

To start a local webserver that compiles and serves the project, simply run the following command:

```bash
npm run dev
```

The website will be available at [http://localhost:3000](http://localhost:3000). It also recompiles automatically if you make any change to the source code.

## Running tests

The unit tests can be executed with the following command:

```bash
npm run test
```

## Deployment

To deploy the website, simply run the command `npm run generate` from the root folder of the project. The final version of the website will then be generate inside the `dist` folder.

## Docker environment

For the project a Docker environment is already prepared and ready to use with all necessary prerequisites.

These Docker containers are the same as used by the continuous integration servers.

### Installation

Install [Docker](https://docs.docker.com/install/) (with Docker Compose) locally on your machine.

### Start and stop the containers

Before start working you have to start the Docker containers:

```
docker-compose up --build --detach
```

The website will be available at [http://127.0.0.1:3000](http://127.0.0.1:3000). It also recompiles automatically if you make any change to the source code.

After finished working you can stop the Docker containers:

```
docker-compose stop
```

### Running commands inside the container

When the containers are running, you can execute any command inside the environment. Just replace the dots `...` in the following example with the command you wish to execute:

```bash
docker-compose exec java /bin/sh -c "..."
```

Some examples are:

```bash
docker-compose exec java /bin/sh -c "npm install"

# or

docker-compose exec java /bin/sh -c "npm run test"
```

## Information

### Support

ToDo: For support, please contact [info@opendatahub.com](mailto:info@opendatahub.com).

### Contributing

If you'd like to contribute, please follow the following instructions:

- Fork the repository.

- Checkout a topic branch from the `master` branch.

- Make sure the tests are passing.

- Create a pull request against the `master` branch.

### Documentation

More documentation can be found at [https://opendatahub.readthedocs.io/en/latest/index.html](https://opendatahub.readthedocs.io/en/latest/index.html).

### License

The code in this project is licensed under the GNU AFFERO GENERAL PUBLIC LICENSE Version 3 license. See the [LICENSE.md](LICENSE.md) file for more information.
