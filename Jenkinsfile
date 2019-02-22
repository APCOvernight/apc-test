node() {

    try {

        stage('Checkout')
        {
            slackSend channel: '#jenkins', color: 'warn', message: ":building_construction: Started Build: APC-Test ${env.BRANCH_NAME} #${env.BUILD_NUMBER}"

            // Clean workspace
            deleteDir()

            // Print environment variables
            echo sh(returnStdout: true, script: 'env')

            // Create a MySQL friendly branch name
            SAFE_BRANCH_NAME = BRANCH_NAME.replace(".", "_").replaceAll('/', '_').replaceAll('-', '_')

            // Remove test database if it exists
            // sh "mysql -u root -p1234 -e \"DROP DATABASE IF EXISTS unidentified_post_${SAFE_BRANCH_NAME}_${BUILD_NUMBER}\""

            // Define sentry api key from jenkins credentials
            withCredentials([string(credentialsId: 'sentry-api', variable: 'sentry_api_key')]) {
                env.SENTRY_API_KEY = "${sentry_api_key}"
            }

            // Set up other env variables
            // env.NODE_ENV = "test"
            // env.DB_CONNECTION = "sqlite"
            // env.DB_DATABASE = "unidentified_post_test_ready"
            // env.DB_FILENAME = "unidentified_post_test_ready"

            // Git checkout
            checkout scm

            // Save git commit to env variables
            env.GIT_COMMIT = sh(returnStdout: true, script: 'git rev-parse HEAD').trim()

            retry(2)
            {
                echo 'Performing yarn install'
                // Do yarn install then re-cache
                sh 'yarn'
                if (!BRANCH_NAME.contains('PR'))
                {
                    sh 'yarn check --integrity'
                }
            }
        } // checkout

        stage('Build')
        {
            parallel(
                'Lint': {
                    try
                    {
                        // Run yarn lint
                        sh 'yarn lint'
                    }
                    catch (e)
                    {
                        // Set build as unstable if lint fails, allow rest of tests to run
                        slackSend channel: '#jenkins', color: 'warning', message: ":warning: Linting error: APC-Test ${env.BRANCH_NAME} #${env.BUILD_NUMBER} (<${env.BUILD_URL}|View Build>)"
                        currentBuild.result = "UNSTABLE"
                    }
                }
            )
        }

        stage('Test')
        {
            parallel(
                "Functional tests": {
                    sh 'yarn run test'
                }
            )
        }
    } catch (e) {
        throw e
    }

} // node
