#!/bin/bash

# Directory to store aggregated coverage files
ROOT_COVERAGE_DIR=./coverage
# Temporary directory to collect coverage files from monorepo packages
PACKAGE_COVERAGE_DIR=$ROOT_COVERAGE_DIR/packages
# Temporary directory to store aggregated coverage files
AGGREGATED_COVERAGE_DIR=$ROOT_COVERAGE_DIR/aggregate

# Clean existing root coverage directory
rm -rf $ROOT_COVERAGE_DIR

# Rebuild coverage directory structure
mkdir $ROOT_COVERAGE_DIR
mkdir $PACKAGE_COVERAGE_DIR
mkdir $AGGREGATED_COVERAGE_DIR

# Run `yarn coverage` in each workspace package
# Note: Each package must have a `coverage` script defined in their `package.json` file.
yarn workspaces run coverage

echo "Aggregating coverage files..."

# Collect coverage from packages
for package in ./packages/*; do
  filename="$(basename $package)"
  echo "Copying coverage from $filename..."
  cp $package/coverage/coverage-final.json $PACKAGE_COVERAGE_DIR/$filename.json
done

# Merge coverage reports
npx nyc merge $PACKAGE_COVERAGE_DIR $AGGREGATED_COVERAGE_DIR/merged-coverage.json
npx nyc report \
  --temp-dir $AGGREGATED_COVERAGE_DIR \
  --report-dir $ROOT_COVERAGE_DIR \
  --reporter=lcov

# Remove temporary directories
rm -rf $PACKAGE_COVERAGE_DIR
rm -rf $AGGREGATED_COVERAGE_DIR

echo "Finished aggregating coverage."
