import { NativeConnection, Worker } from '@temporalio/worker'
import * as activities from 'activities'
import { taskQueue } from 'common'
import { namespace, getConnectionOptions } from 'common/temporal-connection'

async function run() {
  const worker = await Worker.create({
    workflowsPath: require.resolve('../../../packages/workflows/'),
    activities,
    connection: await NativeConnection.connect(getConnectionOptions()),
    namespace,
    taskQueue,
  })

  await worker.run()
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
