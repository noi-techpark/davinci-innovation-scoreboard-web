def getEnvironment(branch_name, tag_name) {
    if (tag_name != null) {
        return 'prod'
    }
    
    if (branch_name == 'master') {
        return 'test'
    }
    
    return 'dev'
}

def getApiUrl(environment) {
    if (environment == 'prod') return 'https://api.innovation.davinci.bz.it/v1/'
    if (environment == 'test') return 'https://api.innovation.davinci.testingmachine.eu/v1/'
}

def getWebUrl(environment) {
    if (environment == 'prod') return 'https://innovation.davinci.bz.it'
    if (environment == 'test') return 'https://innovation.davinci.testingmachine.eu'
}

def getKeycloakRealmUrl(environment) {
    if (environment == 'prod') return 'https://auth.opendatahub.bz.it/auth/realms/noi'
    if (environment == 'test') return 'https://auth.opendatahub.testingmachine.eu/auth/realms/noi'
}


pipeline {
    agent {
        dockerfile {
            filename 'docker/dockerfile-node'
            additionalBuildArgs '--build-arg JENKINS_USER_ID=`id -u jenkins` --build-arg JENKINS_GROUP_ID=`id -g jenkins`'
        }
    }

    environment {
        ENVIRONMENT = getEnvironment(env.BRANCH_NAME, env.TAG_NAME)

        AWS_ACCESS_KEY_ID = credentials('AWS_ACCESS_KEY_ID')
        AWS_SECRET_ACCESS_KEY = credentials('AWS_SECRET_ACCESS_KEY')

        API = getApiUrl(env.ENVIRONMENT)
        WEB = getWebUrl(env.ENVIRONMENT)
        KEYCLOAK_REALM_URL = getKeycloakRealmUrl(env.ENVIRONMENT)
    }

    stages {
        stage('Dependencies') {
            steps {
                sh 'yarn install'
            }
        }
        stage('Test') {
            steps {
                sh 'yarn run test'
            }
        }
        stage('Build') {
            environment {
                KEYCLOAK_CLIENT_ID = "davinci-innovation-scoreboard-web"
                KEYCLOAK_CALLBACK = "${WEB}/callback"
                KEYCLOAK_AUTHORIZATION_URI = "${KEYCLOAK_REALM_URL}/protocol/openid-connect/auth"
                KEYCLOAK_USERINFO_URI = "${KEYCLOAK_REALM_URL}/protocol/openid-connect/userinfo"
                KEYCLOAK_ACCOUNT_URI = "${KEYCLOAK_REALM_URL}/account"
            }
            steps {
                sh 'yarn run generate'
            }
        }
        stage('Upload') {
            steps {
                s3Upload(bucket: "${ENVIRONMENT}-innovation-web", acl: 'PublicRead', file: './dist')
            }
        }
    }
}
