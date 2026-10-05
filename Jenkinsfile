pipeline {
    agent any

    // Tool configuration (Node.js must be configured in Jenkins Global Tool Configuration)
    tools {
        nodejs 'NodeJS-18'
    }

    environment {
        APP_NAME = 'web-project'
        NODE_ENV = 'production'
    }

    stages {

        stage('Checkout') {
            steps {
                echo "========== STAGE: Checkout =========="
                echo "Checking out source code from SCM..."
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                echo "========== STAGE: Install Dependencies =========="
                dir('web-project') {
                    sh 'node --version'
                    sh 'npm --version'
                    sh 'npm install'
                }
            }
        }

        stage('Lint') {
            steps {
                echo "========== STAGE: Lint =========="
                dir('web-project') {
                    sh 'npm run lint || echo "Lint warnings found (non-blocking)"'
                }
            }
        }

        stage('Test') {
            steps {
                echo "========== STAGE: Test =========="
                dir('web-project') {
                    sh 'npm test -- --ci --reporters=default --reporters=jest-junit'
                }
            }
            post {
                always {
                    // Publish Jest test results (requires jest-junit reporter)
                    junit allowEmptyResults: true, testResults: 'web-project/junit.xml'
                }
            }
        }

        stage('Build') {
            steps {
                echo "========== STAGE: Build =========="
                dir('web-project') {
                    sh 'npm run build'
                }
                echo "Build completed successfully!"
            }
        }

        stage('Archive Artifacts') {
            steps {
                echo "========== STAGE: Archive Artifacts =========="
                archiveArtifacts artifacts: 'web-project/**/*',
                                 excludes: 'web-project/node_modules/**',
                                 fingerprint: true
            }
        }

        stage('Deploy') {
            when {
                branch 'main'
            }
            steps {
                echo "========== STAGE: Deploy =========="
                echo "Deploying ${APP_NAME} to production..."
                // Add deployment commands, for example:
                // sh 'rsync -avz --exclude node_modules/ . user@server:/var/www/html/'
                // sh 'pm2 restart web-project || pm2 start index.js --name web-project'
                echo "Deployment complete!"
            }
        }
    }

    post {
        success {
            echo "=============================="
            echo "  BUILD SUCCESSFUL!"
            echo "  Project: ${APP_NAME}"
            echo "=============================="
        }
        failure {
            echo "=============================="
            echo "  BUILD FAILED!"
            echo "  Check the logs above."
            echo "=============================="
        }
        always {
            echo "Pipeline finished. Cleaning up..."
            dir('web-project') {
                sh 'rm -rf node_modules || true'
            }
            cleanWs()
        }
    }
}
